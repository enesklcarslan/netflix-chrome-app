var categoriesMenu = $('<li class="navigation-tab" id="browse-better" style="position:relative; cursor: pointer;"></li>');
categoriesMenu.append('<span id="toggle-menu">Browse All</span>');
categoriesMenu.append('<span class="caret" role="presentation"></span>');
categoriesMenu.append('<div class="triangle"></div>');

var categoriesList = $('<ul id="categories-list"></ul>');

categoriesMenu.append(categoriesList);

var searchForm = $('<form id="categories-form"><input type="text" style="color:white; background-color:#000000;" id="categories-input" autocomplete="off" placeholder="Search"/></form>');
categoriesList.append(searchForm);
categoriesList.append('<hr>');
console.log('elements are created');


//now read js/genres.tr.json from inside the extension and add them to the categories list as <li><a href=
//var jsonDirectory = chrome.runtime.getURL('js/genres.tr.json');
var jsonDirectory = 'https://raw.githubusercontent.com/f/netflix-data/main/genres.tr.json';
var categories = $.getJSON(jsonDirectory, function(data) {
    $.each(data, function(key, val) {
        categoriesList.append('<li><a href="' + val.url + '">' + val.name + '</a></li>');
    });
});
console.log('categories are added now.')


//add input listener to the categories form
$(searchForm).keyup(function() {
    var search = $('#categories-input').val();
    $('#categories-list li').each(function() {
        if ($(this).text().toLowerCase().indexOf(search.toLowerCase()) == -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
});
//show categoriesList when hovering over the categoriesMenu and don't hide if still hovering over the categoriesList
categoriesMenu.hover(function() {
    $('#categories-list').show();
}, function() {
    $('#categories-list').hover(function() {
        $('#categories-list').show();
    }, function() {
        $('#categories-list').hide();
    });
});



categoriesList.css('display', 'none');
categoriesList.css('position', 'absolute');
categoriesList.css('top', '24px');
categoriesList.css('height', '200px');
categoriesList.css('overflow', 'scroll');
categoriesList.css('background-color', '#000000');
categoriesList.css('color', 'white');
categoriesList.css('font-size', '15px');
categoriesList.css('border-radius', '2px');

//change categorieslist scrollbar
categoriesList.css('overflow-y', 'scroll');
categoriesList.css('overflow-x', 'hidden');

//make scrollbar for categoriesList thinner
$('#categories-list::-webkit-scrollbar').css('width', '5px');



//document ready
$(document).ready(function() {
    //wait for the categories to load
    categories.done(function() {
        //add the categories menu to the page
        $('.tabbed-primary-navigation').append(categoriesMenu);
    });
});