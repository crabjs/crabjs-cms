/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";
var config = {
    media: {
        list_dir: ''
    }
};

function haiRE() {
}

/**
 * @return {string}
 */
haiRE.FixPath = function (path) {
    var res = '';
    if (path) {
        res = path.replace(/\\/g, '');
        res = res.replace(/\/\//g, '/');
        res = res.replace(':/', '://');
    }
    return res;
};

/**
 * @return {number}
 */
haiRE.GetFileSize = function (path) {
    var res = 0;
    $.ajax({
        url: path,
        type: 'HEAD',
        async: false,
        success: function (d, s, xhr) {
            res = xhr.getResponseHeader('Content-Length');
        }
    });
    return res;
};

/**
 * @return {string}
 */
haiRE.FormatFileSize = function (f) {
    var prefix = 'B';
    if (!f) {
        f = 0;
    }
    if (f > 1024) {
        f = f / 1024;
        prefix = 'KB';
    }
    if (f > 1024) {
        f = f / 1024;
        prefix = 'MB';
    }

    f = Number(f);
    return f.toFixed(2) + ' ' + prefix;
};

/**
 *
 * @return {string}
 */
haiRE.GetFileName = function (path) {
    var res = path;
    if (path.indexOf('/') > -1) {
        res = path.substring(path.lastIndexOf('/') + 1);
    }
    return res;
};

/**
 * @return {string}
 */
haiRE.GetFileIcon = function (path) {
    var res = '/images/filetypes/unknown.png';
    if (!haiRE.IsImage(path)) {
        res = '/images/filetypes/' + 'file_extension_' + haiRE.GetFileExt(path) + '.png';
    }

    return res;
};

/**
 * @return {string}
 */
haiRE.GetFileExt = function (path) {
    var res = '';
    path = haiRE.GetFileName(path);
    if (path.indexOf('.') > -1) {
        res = path.substring(path.lastIndexOf('.') + 1);
    }
    return res;
};

/**
 * @return {string}
 */
haiRE.GetFileType = function (path) {
    var res = haiRE.GetFileExt(path).toLocaleLowerCase().trim();
    if (res == 'png' || res == 'jpg' || res == 'jpeg' || res == 'bmp' || res == 'gif') {
        return 'image';
    }
};

/**
 * @return {boolean}
 */
haiRE.IsImage = function (path) {
    var res = false;
    if (haiRE.GetFileType(path) == 'image') {
        res = true;
    }
    return res;
};

/**
 * @return {boolean}
 */
haiRE.FileExists = function (path) {
    var res = false;
    $.ajax({
        url: path,
        type: 'HEAD',
        async: false,
        dataType: 'text',
        success: function () {
            res = true
        }
    });
    return res;
};

function dateFormat(input) {
    var t = new Date(input);
    var date = [String('00' + t.getDate()).slice(-2), String('00' + (t.getMonth() + 1)).slice(-2), t.getFullYear()];
    return date.join('/');
}

function GetInformation(e) {
    $(window.parent.document).find('#previewMedia').attr('src', $(e).attr('src'));
    $('#name_media').text(haiRE.GetFileName($(e).attr('src')));
    $('#size_media').text(haiRE.FormatFileSize(haiRE.GetFileSize($(e).attr('src'))));
    $('#createdAt_media').text(dateFormat($(e).attr('created_at')));
}

var page_number = 1;
$('.media-content').bind('scroll', function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        if (page_number) {
            $.ajax({
                type: 'POST',
                url: '/post/list/media',
                data: {
                    page: page_number
                },
                success: function (result) {
                    page_number += 1;
                    var data = result.data;
                    if (result.status == 200) {
                        if (data.length == 0) {
                            page_number = null
                        }
                        for (var i = 0; i < data.length; i++) {
                            $('.media-content').append(`<img created_at="${data[i].created_at}" onclick="GetInformation(this)" src="${data[i].path}" class="img-thumbnail" alt="Cinque Terre" width="120" style="margin: 5px; cursor: pointer;">`)
                        }
                    }
                }
            });
        }
    }
});

function openModalMedia() {
    page_number = 1;
    $.ajax({
        type: 'POST',
        url: '/post/list/media',
        data: {
            page: 0
        },
        success: function (result) {
            var data = result.data;
            if (result.status == 200) {
                for (var i = 0; i < data.length; i++) {
                    $('.media-content').append(`<img created_at="${data[i].created_at}" onclick="GetInformation(this)" src="${data[i].path}" class="img-thumbnail" width="120" style="margin: 5px; cursor: pointer;">`)
                }
            }
        }
    });

    var $media = $('#mediaModal');
    $media.modal('show');
}

$('#mediaModal').on('hidden.bs.modal', function () {
    $('.media-content').empty();
});

function removeElementById(id) {
    $(`#${id}`).remove();
}

var $btn_upload = $('#upload-input');
$btn_upload.on('change', function () {
    var files = $(this).get(0).files;

    if (files.length > 0) {

        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            formData.append('uploads[]', file, file.name);
        }

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $('.media-content img:first-child').before(`<img created_at="${data.created_at}" onclick="GetInformation(this)" src="/media/${data.file_name}" class="img-thumbnail" width="120" style="margin: 5px; cursor: pointer;">`);
            },
            xhr: function () {
                var xhr = new XMLHttpRequest();
                $('.media-content img:first-child').before(`<img src="/images/squarespinner_2x.gif" class="img-thumbnail" alt="hai100dayproject" width="100" style="margin: 5px; cursor: pointer;">`);
                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        if (percentComplete === 100) {
                            $('.media-content img').first().remove();
                        }
                    }
                }, false);

                return xhr;
            }
        })
    }
});

function select_media() {
    var img_val = $('#previewMedia').attr('src');
    var $media = $('#mediaModal');
    $('#previewImage').attr('src', img_val);
    $('#input_previewImage').attr('value', img_val);
    $media.modal('hide');
}