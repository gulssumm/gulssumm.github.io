$(document).ready(function() {
    const pages = [
        "Navigation_Structures_TR.html",
        "Backstack_TR.html",
        "Deleting_TR.html",
        "Empty_States_TR.html",
        "Error_Handling_TR.html",
        "Fast_Scroll_TR.html",
        "Full_Screen_TR.html",
        "Launch_Image_TR.html",
        "Multiple_Selection_TR.html",
        "Portrait_vs_Landscape_TR.html",
        "Saving_Confirmation_TR.html",
        "Search_and_Filter_TR.html",
        "Sheets_TR.html",
        "Text_Input_TR.html",
    ];

    const current = window.location.pathname.split("/").pop();
    const index = pages.indexOf(current);

    if(index > 0) {
        $(".prev").attr("href", pages[index - 1]);
    } else {
        $(".prev").hide(); // hide if no previous
    }

    if(index < pages.length - 1) {
        $(".next").attr("href", pages[index + 1]);
    } else {
        $(".next").hide(); // hide if no next
    }
});
