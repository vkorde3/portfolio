// var icon_row ="<div>";
// for(var rep=0; rep<2; rep++){
//     for (let i = 0; i < data.bg_icon.length; i++)
//         icon_row += '<img src="./assets/icons/bg_icons/' + data.bg_icon[i] + '">';
// }
// icon_row += "</div>";
// $('.bg_row').html(icon_row + icon_row);

// var row = $('.bg_section').html(), bg = "";
// for(var i=0; i<24; i++) bg += row;
// $('.bg_section').html(bg);


data.about.forEach(function (item,idx){
    $('#about_p').append(item).append('<br>');
})


data.education.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';
    
    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx%2===0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx%2!==0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.school + '</div>';
    content += '<div class="card_subtitle">' + item.location + '</div>';
    content += '<div class="card_role">' + item.degree + ", " + item.major + ' (' + item.grade + ')' + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';

    if('desc' in item){
        var ls = '<ul>';
        item.desc.forEach(function (item){
            ls += '<li>' + item + '</li>';
        });
        ls += '</ul>';
        content += '<div class="card_content">' + ls + '</div>';
    }

    content += '</div>';
    content += '</div>';

    $('#education').find('.timeline_list').append(content);
});

data.experience.forEach(function (item, idx) {
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';

    var ls = '<ul>';
    item.desc.forEach(function (descItem) { ls += '<li>' + descItem + '</li>'; });
    ls += '</ul>';

    var dateRange = item.from + " - " + item.to;

    var docLink = item.doc
        ? '<div class="card_doc"><a href="./assets/projects/' + item.doc + '" target="_blank">View Document</a></div>'
        : '';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if (idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + dateRange + '</div>';
    if (idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.company + '</div>';
    content += '<div class="card_subtitle">' + item.location + '</div>';
    content += '<div class="card_role">' + item.role + '</div>';
    content += '<div class="inner_card_date">' + dateRange + '</div>';
    content += '<div class="card_content">' + ls + '</div>';
    content += docLink;
    content += '</div>';
    content += '</div>';

    $('#experience').find('.timeline_list').append(content);
});


data.projects.forEach(function (item, idx) {
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';

    var ls = '<ul>';
    item.desc.forEach(function (descItem) { ls += '<li>' + descItem + '</li>'; });
    ls += '</ul>';

    var dateRange = item.from + " - " + item.to;

    var docLink = item.doc 
        ? '<div class="card_doc"><a href="./assets/projects/' + item.doc + '" target="_blank">View Document</a></div>'
        : '';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if (idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + dateRange + '</div>';
    if (idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.title + '</div>';
    content += '<div class="card_subtitle">' + item.company + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';
    
    // Add performance metrics if available
    if('metrics' in item) {
        content += '<div class="performance-metrics">';
        Object.keys(item.metrics).forEach(function(key) {
            var value = item.metrics[key];
            var isPositive = value.includes('%') || value.includes('+') || parseFloat(value) > 0;
            var metricClass = isPositive ? 'positive' : '';
            content += '<div class="metric-card">';
            content += '<div class="metric-value ' + metricClass + '">' + value + '</div>';
            content += '<div class="metric-label">' + key.replace(/_/g, ' ').toUpperCase() + '</div>';
            content += '</div>';
        });
        content += '</div>';
    }
    
    content += '<div class="card_content">' + ls + '</div>';
    content += docLink;
    content += '</div>';
    content += '</div>';

    $('#projects').find('.timeline_list').append(content);
});

data.leadership.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';
	
    var ls = '<ul>';
    item.desc.forEach(function (item){ ls += '<li>' + item + '</li>'; });
    ls += '</ul>';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx%2===0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx%2!==0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.title + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';
    content += '<div class="card_content">' + ls + '</div>';
    content += '</div>';
    content += '</div>';

    $('#leadership').find('.timeline_list').append(content);
}); 

data.interests.forEach(function (item, idx, arr){
    var bullet = idx !== arr.length - 1 ? '\t|\t' : ''; // Unicode bullet symbol
    $('#interests').find('.timeline_block').append(item + bullet);
});
