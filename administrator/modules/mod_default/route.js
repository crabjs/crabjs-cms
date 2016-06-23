/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";
let express = require('express'),
    router = express.Router(),
    dashboard = require('./controllers/dashboard'),

    articles = require('./controllers/posts/articles'),
    categories = require('./controllers/posts/categories'),

    settings = require('./controllers/system/settings'),
    logs = require('./controllers/system/logs'),
    messages = require('./controllers/system/messages'),

    users = require('./controllers/users/users'),
    roles = require('./controllers/users/roles');

function isMe() {
    return function (req, res, next) {
        if (req.user._id == req.params.id || req.user.email == __config.admin_email) return next();

        __models.Objects.findById(req.user.role_id, function (err, re) {
            if (err) {
                __.logger.error(err);
                return _module.render_error(req, res, '500');
            }
            if (re.values.indexOf('view_user_profile') >= 0) {
                next();
            } else {
                req.flash('warning', 'Bạn không có quyền xem thông tin của người dùng khác.');
                return res.redirect('/admin/dashboard');
            }
        });

    };
}

/**
 * Account management
 */
router.route('/users/create')
    .get(__.isAllow('create_user'), users.create)
    .post(__.isAllow('create_user'), users.created);

router.route('/users')
    .get(__.isAllow('list_user'), users.list)
    .delete(__.isAllow('delete_user'), users.delete);

router.route('/users/view/:id')
    .get(isMe(), users.view)
    .post(__.isAllow('update_user'), users.update)
    .delete(users.delete_cache); // Xóa cache settings của người dùng

router.route('/users/change_pass').post(users.change_pass);

/**
 * Account roles
 */
router.route('/roles')
    .get(__.isAllow('list_role'), roles.list)
    .delete(__.isAllow('delete_role'), roles.delete);

router.route('/roles/create')
    .get(__.isAllow('create_role'), roles.create)
    .post(__.isAllow('create_role'), roles.created);

router.route('/roles/view/:id')
    .get(__.isAllow('update_role'), roles.view)
    .post(__.isAllow('update_role'), roles.update);

/**
 * System settings
 */
router.route('/settings')
    .get(__.isAllow('site_setting'), settings.web_settings)
    .post(__.isAllow('site_setting'), settings.web_settings_update);

router.route('/modules/install')
    .get(__.isAllow('install_module'), settings.module_install);

router.route('/themes')
    .get(__.isAllow('install_theme'), settings.theme_install);

router.route('/widget')
    .get(__.isAllow('widget_theme'), settings.widget);

router.route('/system/report')
    .get(settings.report);

router.route('/logs')
    .get(__.isAllow('system_logs'), logs.list)
    .delete(__.isAllow('system_logs'), logs.delete);

router.route('/messages')
    .get(messages.index);

/**
 * Dashboard
 */
router.route('/dashboard')
    .get(dashboard.view);

/**
 * Categories
 */
router.route('/categories')
    .get(__.isAllow('list_category'), categories.list)
    .post(__.isAllow('create_category'), categories.create)
    .delete(__.isAllow('delete_category'), categories.delete);

router.route('/categories/:id')
    .post(__.isAllow('update_category'), categories.update);

/**
 * Articles
 */
router.route('/posts')
    .get(__.isAllow('list_article'), articles.list)
    .delete(__.isAllow('delete_article'), articles.delete);

router.route('/posts/create')
    .get(__.isAllow('create_article'), articles.create)
    .post(__.isAllow('create_article'), articles.created);

router.route('/posts/view/:id')
    .get(__.isAllow('update_article'), articles.view)
    .post(__.isAllow('update_article'), articles.update);

module.exports = router;