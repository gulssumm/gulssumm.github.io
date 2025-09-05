document.addEventListener('DOMContentLoaded', function() {
    // Define the navigation order
    const pages = [
        'Navigation_Structures_TR.html',
        'Backstack_TR.html',
        'Deleting_TR.html',
        'Empty_States_TR.html',
        'Error_Handling_TR.html',
        'Fast_Scroll_TR.html',
        'Full_Screen_TR.html',
        'Launch_Image_TR.html',
        'Multiple_Selection_TR.html',
        'Portrait_vs_Landscape_TR.html',
        'Saving_Confirmation_TR.html',
        'Search_and_Filter_TR.html',
        'Sheets_TR.html',
        'Text_Input_TR.html'
    ];

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Find current page index
    const currentIndex = pages.indexOf(currentPage);
    
    // Setup next link 
    const nextLink = document.querySelector('.content-paging .next');
    if (nextLink && currentIndex > 0) {
        nextLink.href = pages[currentIndex - 1];
    } else if (nextLink) {
        nextLink.style.display = 'none';
    }
    
    // Setup previous link 
    const prevLink = document.querySelector('.content-paging .prev');
    if (prevLink && currentIndex !== -1 && currentIndex < pages.length - 1) {
        prevLink.href = pages[currentIndex + 1];
    } else if (prevLink) {
        prevLink.style.display = 'none';
    }

    // Setup "back to top" functionality
    const toTopButton = document.querySelector('a.to-top');
    if (toTopButton) {
        toTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});