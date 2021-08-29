$(document).ready(function () {
    //hide
    $('.bt1').click(function () {
        $('#img1').hide(2000);
    });
    //show
    $('.bt2').click(function () {
        $('#img1').show(2000);
    });
    //toggle
    $('.bt3').click(function () {
        $('#img1').toggle("slow");
    });
    //fadeout
    $('.bt4').click(function () {
        $('#img1').fadeOut();
    });
    //fadein
    $('.bt5').click(function () {
        $('#img1').fadeIn();
    });
    //fadetoggle
    $('.bt6').click(function () {
        $('#img1').fadeToggle();
    });
    //fadeto
    $('.bt7').click(function () {
        $('#img1').fadeTo(1000, .5);
    });
    //wewe
    $('.fardin').click(function () {

        $('.rahman').slideToggle();
    });
    //dragable
    $("#draggable").draggable();

    // There's the gallery and the trash
    var $gallery = $("#gallery"),
        $trash = $("#trash");

    // Let the gallery items be draggable
    $("li", $gallery).draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: "clone",
        cursor: "move"
    });

    // Let the trash be droppable, accepting the gallery items
    $trash.droppable({
        accept: "#gallery > li",
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function (event, ui) {
            deleteImage(ui.draggable);
        }
    });

    // Let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
        accept: "#trash li",
        classes: {
            "ui-droppable-active": "custom-state-active"
        },
        drop: function (event, ui) {
            recycleImage(ui.draggable);
        }
    });

    // Image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    function deleteImage($item) {
        $item.fadeOut(function () {
            var $list = $("ul", $trash).length ?
                $("ul", $trash) :
                $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

            $item.find("a.ui-icon-trash").remove();
            $item.append(recycle_icon).appendTo($list).fadeIn(function () {
                $item
                    .animate({ width: "48px" })
                    .find("img")
                    .animate({ height: "36px" });
            });
        });
    }

    // Image recycle function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage($item) {
        $item.fadeOut(function () {
            $item
                .find("a.ui-icon-refresh")
                .remove()
                .end()
                .css("width", "96px")
                .append(trash_icon)
                .find("img")
                .css("height", "72px")
                .end()
                .appendTo($gallery)
                .fadeIn();
        });
    }

    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage($link) {
        var src = $link.attr("href"),
            title = $link.siblings("img").attr("alt"),
            $modal = $("img[src$='" + src + "']");

        if ($modal.length) {
            $modal.dialog("open");
        } else {
            var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
                .attr("src", src).appendTo("body");
            setTimeout(function () {
                img.dialog({
                    title: title,
                    width: 400,
                    modal: true
                });
            }, 1);
        }
    }

    // Resolve the icons behavior with event delegation
    $("ul.gallery > li").on("click", function (event) {
        var $item = $(this),
            $target = $(event.target);

        if ($target.is("a.ui-icon-trash")) {
            deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
        } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
        }

        return false;
    });
    //
    $("#resizable").resizable({
        animate: true
    });
    //
    $("#accordion").accordion({
        collapsible: true
    });
    //
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });
    //
    $("#datepicker").datepicker();
    //
    $("#dialog").dialog();
    //
    var progressTimer,
        progressbar = $("#progressbar"),
        progressLabel = $(".progress-label"),
        dialogButtons = [{
            text: "Cancel Download",
            click: closeDownload
        }],
        dialog = $("#dialog").dialog({
            autoOpen: false,
            closeOnEscape: false,
            resizable: false,
            buttons: dialogButtons,
            open: function () {
                progressTimer = setTimeout(progress, 2000);
            },
            beforeClose: function () {
                downloadButton.button("option", {
                    disabled: false,
                    label: "Start Download"
                });
            }
        }),
        downloadButton = $("#downloadButton")
            .button()
            .on("click", function () {
                $(this).button("option", {
                    disabled: true,
                    label: "Downloading..."
                });
                dialog.dialog("open");
            });

    progressbar.progressbar({
        value: false,
        change: function () {
            progressLabel.text("Current Progress: " + progressbar.progressbar("value") + "%");
        },
        complete: function () {
            progressLabel.text("Complete!");
            dialog.dialog("option", "buttons", [{
                text: "Close",
                click: closeDownload
            }]);
            $(".ui-dialog button").last().trigger("focus");
        }
    });

    function progress() {
        var val = progressbar.progressbar("value") || 0;

        progressbar.progressbar("value", val + Math.floor(Math.random() * 3));

        if (val <= 99) {
            progressTimer = setTimeout(progress, 50);
        }
    }

    function closeDownload() {
        clearTimeout(progressTimer);
        dialog
            .dialog("option", "buttons", dialogButtons)
            .dialog("close");
        progressbar.progressbar("value", false);
        progressLabel
            .text("Starting download...");
        downloadButton.trigger("focus");
    }
    //
    var circle = $("#circle");

    $("#radius").selectmenu({
        change: function (event, data) {
            circle.css({
                width: data.item.value,
                height: data.item.value
            });
        }
    });

    $("#color").selectmenu({
        change: function (event, data) {
            circle.css("background", data.item.value);
        }
    });
    //
    $("#tabs").tabs();
    //
    var state = true;
    $("#button").on("click", function () {
        if (state) {
            $("#effect").animate({
                backgroundColor: "#aa0000",
                color: "#fff",
                width: 500
            }, 1000);
        } else {
            $("#effect").animate({
                backgroundColor: "#fff",
                color: "#000",
                width: 240
            }, 1000);
        }
        state = !state;
    });
});
