# jQuery ToSVG
[![N|Solid](https://www.wysiwygwebbuilder.com/images/SVGImage.jpg)](https://www.w3schools.com/html/html5_svg.asp)

## Плагин для замены тега img на inline svg

### Settings

Option | Type | Default 
------ | ---- | ------- 
svgClass | string | replaced-svg 
onComplete | function | function(){} 



## Версия плагина с использованием jQuery

```javascript

// ToSVG plugin to replace the img tag with inline svg by vereschak@gmail.com
( function ( $ ) {
    $.fn.toSVG = function ( options ) {
        var params = $.extend( {
            svgClass: "replaced-svg",
            onComplete: function () {},
        }, options )
        this.each( function () {
            var $img = jQuery( this );
            var imgID = $img.attr( 'id' );
            var imgClass = $img.attr( 'class' );
            var imgURL = $img.attr( 'src' );
            if ( !( /\.(svg)$/i.test( imgURL ) ) ) {
                console.warn( "image src='" + imgURL + "' is not a SVG, item remained tag <img/> " );
                return;
            }
            $.get( imgURL, function ( data ) {
                var $svg = jQuery( data ).find( 'svg' );
                if ( typeof imgID !== 'undefined' ) {
                    $svg = $svg.attr( 'id', imgID );
                }
                if ( typeof imgClass !== 'undefined' ) {
                    $svg = $svg.attr( 'class', imgClass + " " + params.svgClass );
                }
                $svg = $svg.removeAttr( 'xmlns:a' );
                if ( !$svg.attr( 'viewBox' ) && $svg.attr( 'height' ) && $svg.attr( 'width' ) ) {
                    $svg.attr( 'viewBox', '0 0 ' + $svg.attr( 'height' ) + ' ' + $svg.attr( 'width' ) )
                }
                $img.replaceWith( $svg );
                typeof params.onComplete == "function" ? params.onComplete.call( this, $svg ) : '';
            } )
        } );
    }
} )( jQuery );

$( document ).ready( function () {
    $( 'img.svg' ).toSVG( {
        svgClass: "SVG",
        onComplete: function ( data ) {
            console.log( data )
                // data возвращает уже вставленный в документ елемент svg
        }
    } );
});
```


### Вы также можете получить вашу svg без jQuery:

```javascript

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

".svg".toSVG({
    svgClass: "replaced",
    onComplete: function() {}
});



```



### Минифицированная версия плагина на чистом javascript для вставки тегом script в HTML(до начала загрузки jQuery):

``` javascript
!function(){String.prototype.toSVG=function(t){var e=function(t,e){if("object"!=typeof e)return!1;for(var r in t){if(e.hasOwnProperty(r))break;e[r]=t[r]}return e}({svgClass:"replaced-svg",onComplete:function(){}},t),r=function(t,e){var r=new XMLHttpRequest;r.open("GET",t,!0),r.send(),r.onreadystatechange=function(){4==r.readyState&&(200!=r.status?console.log(r.status+": "+r.statusText):e.call(this,r.responseText))}};Array.prototype.forEach.call(document.querySelectorAll(this),function(t){var i=t,n=i.getAttribute("id"),o=i.getAttribute("class"),s=i.getAttribute("src");/\.(svg)$/i.test(s)?r(s,function(t){var r=document.createElement("html");r.innerHTML="<body>"+t+"</body>";var s=r.getElementsByTagName("svg")[0];void 0!=n&&null!=n&&s.setAttribute("id",n),void 0!==o&&s.setAttribute("class",o+" "+e.svgClass),s.removeAttribute("xmlns:a"),!s.getAttribute("viewBox")&&s.getAttribute("height")&&s.getAttribute("width")&&s.getAttribute("viewBox","0 0 "+s.getAttribute("height")+" "+s.getAttribute("width")),i.parentNode.replaceChild(s,i),"function"==typeof e.onComplete&&e.onComplete.call(this,s)}):console.warn("image src='"+s+"' is not a SVG, item remained tag <img/> ")})}}();

".svg".toSVG({
    svgClass: "replaced",
    onComplete: function() {}
});
```
