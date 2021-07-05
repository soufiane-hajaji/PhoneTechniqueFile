var DEBUG = false;if(!DEBUG){console.log = () => {};}
$(document).ready(function () {
    function relatedPost(g, e, r) {
        $.ajax({
            url: "/feeds/posts/default/-/" + e + "?alt=json-in-script&max-results=" + r,
            type: "get",
            dataType: "jsonp",
            success: function (t) {
                for (var u = "", h = '<div class="related">', x = 0; x < t.feed.entry.length; x++) {
                    for (var z = 0; z < t.feed.entry[x].link.length; z++) {
                        if ("alternate" == t.feed.entry[x].link[z].rel) {
                            u = t.feed.entry[x].link[z].href;
                            break
                        }
                    }
                    var p = t.feed.entry[x].title.$t;
                    var c = t.feed.entry[x].content.$t;
                    var y = $('<div>').html(c);
                    if (c.indexOf("https://www.youtube.com/embed/") > -1 || c.indexOf("https://www.youtube.com/embed/") > -1) {
                        var d = t.feed.entry[x].media$thumbnail.url,
                            m = d.replace('/default.jpg', '/mqdefault.jpg'),
                            k = m;
                    } else if (c.indexOf("<img") > -1) {
                        var s = y.find('img:first').attr('src'),
                            v = s.replace('s72-c', 's600');
                        var k = v;
                    } else {
                        var k = 'https://2.bp.blogspot.com/-4lZ7DCckjkg/WtaPclghMGI/AAAAAAAAN00/4Cais5iSDRwwUyU6jEc7qlCojlg1izsVgCLcBGAs/s1600/noImage.png';
                    }
                    h += '<li><div class="related-thumb"><a class="related-img lazyload" href="' + u + '" style="background:url(' + k + ') no-repeat center center;background-size: cover"/></div><h3 class="related-title"><a href="' + u + '">' + p + '</a></h3></li>'
                }
                h += '</div>', g.html(h);
            }
        })
    };
    $("#related-posts").each(function () {
        var g = $(this),
            e = g.text(),
            r = 6;
        relatedPost(g, e, r);
    });
});
