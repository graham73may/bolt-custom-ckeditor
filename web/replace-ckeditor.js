jQuery(document).ready(function ($) {
    function checkCKEditors () {
        'use strict';

        var CKEDITORPluginExtras = false;

        if (typeof(CKEDITOR) != 'undefined') {
            CKEDITOR.on('instanceReady', function (event, instance) {
                if (CKEDITORPluginExtras) {
                    return;
                }

                var config = event.editor.config;

                // Modify the default config
                config.toolbar     = "Custom";
                config.contentsCss = "/theme/eif/assets/css/ckeditor.min.css";
                config.skin        = "boltcke";

                // Buttons to disable
                // http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Toolbar
                // - Justify
                // - HR
                // - Colour
                // - Highlight color
                // - Table
                // - Outdent
                // - Indent
                // - Code block
                // - Paste from Word
                config.removeButtons = 'JustifyBlock,HorizontalRule,TextColor,BGColor,Table,CodeSnippet,PasteFromWord';

                // Reconfigure the toolbar(s) layout
                // Default available here: http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Toolbar
                // @formatter:off
                config.toolbar_Custom =
                    [
                        { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
                        { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
                        { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
                        { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton','HiddenField' ] },
                        { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] },
                        '/',
                        { name: 'styles', items : [ 'Format','Styles','Font','FontSize' ] },
                        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
                        { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
                        { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                        { name: 'insert', items : [ 'CreatePlaceholder', 'Image','oembed','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
                        '/',
                        { name: 'colors', items : [ 'TextColor','BGColor' ] }
                    ];

                // Customise the styles dropdown
                config.stylesSet = 'custom_styles';

                if(!CKEDITOR.stylesSet.registered.hasOwnProperty('custom_styles')){
                    CKEDITOR.stylesSet.add( 'custom_styles', [
                            /*
                            // Block Styles
                            { name: 'Blue Title',       element: 'h3',      styles: { 'color': 'Blue' } },
                            { name: 'Red Title',        element: 'h3',      styles: { 'color': 'Red' } },

                            // Inline Styles
                            { name: 'Marker: Yellow',   element: 'span',    styles: { 'background-color': 'Yellow' } },
                            { name: 'Marker: Green',    element: 'span',    styles: { 'background-color': 'Lime' } },

                            // Object Styles
                            {
                                name: 'Image on Left',
                                element: 'img',
                                attributes: {
                                    style: 'padding: 5px; margin-right: 5px',
                                    border: '2',
                                    align: 'left'
                             }
                            },
                            */

                        // { name: 'Small heading', element: 'p', attributes: { 'class': 'ts-body--small-heading' } },
                        { name: 'Standfirst / Intro paragraph', element: 'p', attributes: { 'class': 'ts-body--large' } },
                        // { name: 'Large', element: 'p', attributes: { 'class': 'ts-body--large' } },
                        { name: 'Caption text', element: 'p', attributes: { 'class': 'ts-caption' } },
                        // { name: 'Extra small', element: 'p', attributes: { 'class': 'ts-body--extra-small' } },
                        { name : 'Block List' , element : 'ul', attributes : { 'class' : 'ts-block-list' } }
                    ]);
                }
                // @formatter:on

                // Loads a plugin from '/myplugin/samples/plugin.js'.
                CKEDITOR.plugins.addExternal('lineutils', '/extensions/local/soapbox/customckeditor/plugins/lineutils/');
                CKEDITOR.plugins.addExternal('placeholder', '/extensions/local/soapbox/customckeditor/plugins/placeholder/');

                config.extraPlugins = 'lineutils,placeholder,codemirror';

                config.on = {
                    instanceReady : function () {
                        var link = document.createElement('link');

                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', '/extensions/local/soapbox/customckeditor/plugins/placeholder/css/plugin.css');

                        document.getElementsByTagName('head')[0].appendChild(link);
                    }
                };

                for (var name in CKEDITOR.instances) {
                    if (CKEDITOR.instances.hasOwnProperty(name)) {
                        CKEDITOR.instances[name].destroy();

                        CKEDITOR.replace(name, config);
                    }
                }

                CKEDITORPluginExtras = true;
            });
        }
    }

    // Run on load
    checkCKEditors();

    $('.add-button').on('click', function () {
        checkCKEditors();
    });
});
