// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];
  //html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryURL;
    var viewitem = item.viewItemURL;
	console.log(item);
	
	// start of first party code
	var price    = item.sellingStatus[0].currentPrice[0].__value__;
	var currency = item.sellingStatus[0].currentPrice[0]["@currencyId"];
	if (currency == "GBP") { // convert common currencies to their symbols
		currency = "£";
	} else if (currency == "EUR") {
		currency = "€";
	} else if (currency == "USD") {
		currency = "$";
	}
	//console.log(item.);
    if (null != title && null != viewitem) {
      html.push('<h4><a href="' + viewitem + '" target="_blank">' + title + '</a></h4>' +
				'<ul><li>' + '<img src="' + pic + '" border="0">' + '</li>' + 
				'<li>Price: ' + currency + price + '</li></ul>');
    }
	// end of first party code
	
  }
  //html.push('</tbody></table>');
  document.getElementById("eBayResults").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function

// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
  {"name":"MaxPrice", 
   "value":"25",
   "paramName":"Currency", 
   "paramValue":"GBP"},
  {"name":"FreeShippingOnly", 
   "value":"false", 
   "paramName":"", 
   "paramValue":""},
  {"name":"ListingType", 
   "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"], 
   "paramName":"", 
   "paramValue":""},
  ];


// Define global variable for the URL filter
var urlfilter = "";

// Generates an indexed URL snippet from the array of item filters
function  buildURLArray() {
  // Iterate through each filter in the array
  for(var i=0; i<filterarray.length; i++) {
    //Index each item filter in filterarray
    var itemfilter = filterarray[i];
    // Iterate through each parameter in each item filter
    for(var index in itemfilter) {
      // Check to see if the paramter has a value (some don't)
      if (itemfilter[index] !== "") {
        if (itemfilter[index] instanceof Array) {
          for(var r=0; r<itemfilter[index].length; r++) {
          var value = itemfilter[index][r];
          urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
          }
        } else {
          urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
        }
      }
    }
  }
}  // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);

// Construct the request
// Replace MyAppID with your Production AppID

// NOTES:
// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=OscarNa-UniOfGlo-PRD-de043dc2e-a6426902&GLOBAL-ID=EBAY-GB&keywords=bike&outputSelector=AspectHistogram
// histogram aspectName

var url =  "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
	url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=OscarNa-UniOfGlo-PRD-de043dc2e-a6426902";
    url += "&GLOBAL-ID=EBAY-GB";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD=true";
    url += "&keywords=" + document.getElementById("bikeType").innerText;
	url += "&aspectFilter.aspectName=Colour&aspectFilter.aspectValueName=" + document.getElementById("bikeColour").innerText;
	//url += "&aspectFilter.aspectName=Brand&aspectFilter.aspectValueName=" + document.getElementById("bikeBrand").innerText;
	//url += "&aspectFilter.aspectName=WheelSize&aspectFilter.aspectValueName=" + document.getElementById("bikeWheelSize").innerText;
    url += "&paginationInput.entriesPerPage=10";
	url += "&paginationInput.pageNumber=1";
	url += "&IncludeSelector=ItemSpecifics";
    url += urlfilter;

// Submit the request 
s=document.createElement('script'); // create script element
s.src= url;
document.body.appendChild(s);