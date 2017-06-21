# jQuery ToSVG
[![N|Solid](https://www.wysiwygwebbuilder.com/images/SVGImage.jpg)](https://www.w3schools.com/html/html5_svg.asp)

### Плагин для замены тега img на inline svg

### Settings

Option | Type | Default 
------ | ---- | ------- 
svgClass | string | replaced-svg 
onComplete | function | function(){} 

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
