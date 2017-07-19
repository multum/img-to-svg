// ToSVG plugin without jQuery to replace the img tag with inline svg by vereschak@gmail.com
(function() {
    String.prototype.toSVG = function(obj) {
        var defaultObj = {
            svgClass: "replaced-svg",
            onComplete: function() {},
        }

        function extend(one, two) {
            if (typeof two != "object") return false;
            for (var key in one) {
                if (two.hasOwnProperty(key)) break;
                two[key] = one[key];
            }
            return two;
        }

        var params = extend(defaultObj, obj);

        var getSVG = function(file, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file, true);
            xhr.send(); // (1)
            xhr.onreadystatechange = function() { // (3)
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log((xhr.status + ': ' + xhr.statusText));
                } else {
                    callback.call(this, xhr.responseText)
                }
            }
        }
        
        Array.prototype.forEach.call(document.querySelectorAll(this), function(el) {
            var img = el;
            var imgID = img.getAttribute('id');
            var imgClass = img.getAttribute('class');
            var imgURL = img.getAttribute('src');
            if (!(/\.(svg)$/i.test(imgURL))) {
                console.warn("image src='" + imgURL + "' is not a SVG, item remained tag <img/> ");
                return;
            }
            getSVG(imgURL, function(data) {
                var html = document.createElement("html");
                html.innerHTML = "<body>" + data + "</body>"
                var svg = html.getElementsByTagName("svg")[0];
                if (imgID != undefined && imgID != null) {
                    svg.setAttribute('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    svg.setAttribute('class', imgClass + " " + params.svgClass);
                }
                svg.removeAttribute('xmlns:a');
                if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                    svg.getAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
                }
                img.parentNode.replaceChild(svg, img);
                typeof params.onComplete == "function" ? params.onComplete.call(this, svg) : '';
            })
        });
    }
})();