# ToSVG on jQuery and without jQuery
[![N|Solid](https://www.wysiwygwebbuilder.com/images/SVGImage.jpg)](https://www.w3schools.com/html/html5_svg.asp)

## Плагин для замены тега `<img/>` на inline svg

### Settings

Option | Type | Default 
------ | ---- | ------- 
svgClass | string | replaced-svg 
onComplete | function | function(){} 



### Инициализация плагина с использованием jQuery(подключив img-to-svg-jq.js):

```javascript
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


### Вы также можете получить вашу svg без jQuery(подключив img-to-svg.js):

```javascript
".svg".toSVG({
    svgClass: "replaced",
    onComplete: function() {}
});
```

