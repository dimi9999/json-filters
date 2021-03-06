$(document).ready(function() {  
    var products = $('.products');
    //$('#get').click(function () {

    $.ajax({    
        type: 'GET',
        url: 'data/products.json',    
        dataType : 'json',
        success: function (data) {
            product_list = data;
            var products_data = '';
            $.each(data, function (key, value) {
                products_data += '<div class="product col-sm-6 col-md-4">';
                products_data += '<div class="inner">';
                products_data += '<a href="#" class="product-photo">';
                products_data += '<img src ="' + value.image.small + '" />';
                products_data += '</a>';
                products_data += '<h2><a href="#"> ' + value.name + ' </a></h2>';
                products_data += '<div class="product-description">';
                products_data += '<div class="product-manu"><span>Manufacturer:</span>' + value.specs.manufacturer + '</div>';
                products_data += '<div class="product-storage"><span>Storage:</span>' + value.specs.storage + '</div>';
                products_data += '<div class="product-os"><span>Os:</span>' + value.specs.os + '</div>';
                products_data += '<div class="product-camera"><span>Camera:</span>' + value.specs.camera + '</div>';
                products_data += '<div class="product-desc"><span>Description</span>' + value.description + '</div>';
                products_data += '</div>';
                products_data += '<p class="product-price">' + value.price + '</p>';
                products_data += '</div>';
                products_data += '</div>';
            });
            $('.products').append(products_data);
               
        }
        //});
        // POPULATE CONTENT VIA FILTERS         
    })
        
    $('#show').click(function (e) {
        e.preventDefault();
        var result = $('input[type="checkbox"]:checked');
        if(result.length<1)
            renderAll(product_list);
        else
            renderList(result);
    });
})

function renderList(result) {
    var product_table = {};
    product_list.forEach(function(product) {
        result.each(function() {
            if(product.specs[this.name.toLowerCase()]==this.value) {
                product_table[product.name] = product;

            }
        });
    });
    var resultString = `<div><h4>Showing products ${Object.keys(product_table).length}</h4></div>`;
    $('.products').html(resultString);
    for(let product in product_table) {
        renderOne(product_table[product]);
    }
}
function renderAll() {
    var resultString = `<div><h4>No filters. ${product_list.length} Showing products</h4></div>`;
    $('.products').html(resultString);
    product_list.forEach(function(product){
        renderOne(product);
    });
}
function renderOne(product) {
    var resultString = "";
    resultString += `<div class="product col-sm-6 col-md-4">`;
    resultString += `<div class="inner">`;
    resultString += `<a href="#" class="product-photo"><img src="http:${product.image.small}"/></a>`;
    resultString += `<h2><a href="#">${product.name}</a></h2>`;
    resultString += `<div class="product-description">`;
    resultString += `<div>Attribute selected:' + $(this).val() + "</div>`;
    resultString += `<div class="product-manu"><span>Manufacturer:</span>${product.specs.manufacturer}</div>`;
    resultString += `<div class="product-storage"><span>Storage:</span>${product.specs.storage}</div>`;
    resultString += `<div class="product-os"><span>Os:</span>${product.specs.os}</div>`;
    resultString += `<div class="product-camera"><span>Camera:</span>${product.specs.camera}</div>`;
    resultString += `<div class="product-desc"><span>Description</span>${product.description}</div>`;
    resultString += `</div>`;
    resultString += `<p class="product-price">${product.price}</p>`;
    resultString += `</div>`;
    resultString += `</div>`;
    $('.products').append(resultString);
}