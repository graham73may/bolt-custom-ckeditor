jQuery(document).ready(function ($) {
    var CKEDITORPluginExtras = false;

    if (typeof(CKEDITOR) != 'undefined') {
        CKEDITOR.on('instanceReady', function (event, instance) {
            if (CKEDITORPluginExtras) {
                return;
            }

            var config = event.editor.config;

            // Modify the default config
            config.toolbar     = "Custom";
            config.contentsCss = "/extensions/local/soapbox/customckeditor/wysiwyg.css";
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
            config.removeButtons = 'JustifyBlock,HorizontalRule,TextColor,BGColor,Outdent,Indent,Table,CodeSnippet';

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
                    { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
                    { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
                    { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
                    { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                    { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
                    '/',
                    { name: 'colors', items : [ 'TextColor','BGColor' ] }
                ];


            // Customise the styles dropdown
            config.stylesSet = 'custom_styles';

            CKEDITOR.stylesSet.add( 'custom_styles', [
                // Block-level styles.
                { name: 'Blue Title', element: 'h2', styles: { color: 'Blue' } },
                { name: 'Red Title',  element: 'h3', styles: { color: 'Red' } },

                // Inline styles.
                { name: 'CSS Style', element: 'span', attributes: { 'class': 'my_style' } },
                { name: 'Marker: Yellow', element: 'span', styles: { 'background-color': 'Yellow' } }
            ]);
            // @formatter:on

            var name;

            for (name in CKEDITOR.instances) {
                if (CKEDITOR.instances.hasOwnProperty(name)) {
                    CKEDITOR.instances[name].destroy();

                    CKEDITOR.replace(name, config);
                }
            }

            CKEDITORPluginExtras = true;
        });
    }
});
