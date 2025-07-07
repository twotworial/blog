function recentpostinfoarlina(t) {
  document.write('<ul class="recent_posts_arlina">');
  for (var e = 0; e < numposts; e++) {
    if (e == t.feed.entry.length) break;
    
    var entry = t.feed.entry[e];
    var title = entry.title.$t;
    var link = "";
    var commentText = "", commentUrl = "";
    
    for (var j = 0; j < entry.link.length; j++) {
      if (entry.link[j].rel == "alternate") {
        link = entry.link[j].href;
      }
      if (entry.link[j].rel == "replies" && entry.link[j].type == "text/html") {
        commentText = entry.link[j].title;
        commentUrl = entry.link[j].href;
      }
    }

    var thumbnail;
    try {
      thumbnail = entry.media$firstImage.url;
    } catch (error) {
      var content = entry.content.$t;
      var imgStart = content.indexOf("<img");
      var srcStart = content.indexOf('src="', imgStart);
      var srcEnd = content.indexOf('"', srcStart + 5);
      var imgUrl = content.substr(srcStart + 5, srcEnd - srcStart - 5);
      thumbnail = (imgStart != -1 && srcStart != -1 && srcEnd != -1 && imgUrl != "") ?
        imgUrl : "https://cdn.jsdelivr.net/gh/twotworial/blog@main/InfoTwotworial.png";
    }

    var published = entry.published.$t;
    var year = published.substring(0, 4);
    var month = published.substring(5, 7);
    var day = published.substring(8, 10);
    var monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    document.write('<li class="clearfix">');

    if (showpostthumbnails == 1) {
      document.write('<span class="wrapinfo"><img class="recent_thumb" src="' + thumbnail + '" alt="' + title + '" /></span>');
    }

    document.write('<a href="' + link + '" target="_top">' + title + '</a><br>');

    var summary = "";
    if ("content" in entry) summary = entry.content.$t;
    else if ("summary" in entry) summary = entry.summary.$t;

    summary = summary.replace(/<\S[^>]*>/g, "");

    if (showpostsummary == 1) {
      if (summary.length < numchars) {
        document.write("<i>" + summary + "</i>");
      } else {
        summary = summary.substring(0, numchars);
        var lastSpace = summary.lastIndexOf(" ");
        summary = summary.substring(0, lastSpace);
        document.write("<i>" + summary + "...</i>");
      }
    }

    document.write("<br>");
    var extraInfo = "";
    var hasContent = false;

    if (showpostdate == 1) {
      extraInfo += monthNames[parseInt(month, 10)] + "-" + day + " - " + year;
      hasContent = true;
    }

    if (showcommentnum == 1) {
      if (hasContent) extraInfo += " | ";
      if (commentText == "1 Comments") commentText = "1 Comment";
      if (commentText == "0 Comments") commentText = "No Comments";
      commentText = '<a href="' + commentUrl + '" target="_top">' + commentText + '</a>';
      extraInfo += commentText;
      hasContent = true;
    }

    if (displaymore == 1) {
      if (hasContent) extraInfo += " | ";
      extraInfo += '<a href="' + link + '" class="url" target="_top">Read more</a>';
    }

    document.write(extraInfo);
    document.write("</li>");

    if (displayseparator == 1 && e != numposts - 1) {
      document.write("<hr size=0.5>");
    }
  }
  document.write("</ul>");
}
