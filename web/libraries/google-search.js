/**
 * google-search.js, version 0.9
 *
 * This is a JavaScript wrapper for Google's Web Search API:
 * 
 *   http://www.google.com/apis/
 *
 * It uses Mozilla's SOAP API, so this JavaScript can only be used in
 * Mozilla or Firefox. Further, because using SOAP makes
 * calls to web pages in a different domain, this code cannot be
 * executed in the sandbox of a webpage; it needs to be run in a
 * trusted environment. For example, it can be used in a Firefox extension
 * or as part of a Chickenfoot script.
 *
 * The majority of the code was generated from the WSDL file using wsdl2js:
 *
 *   http://www.bolinfest.com/wsdl2js/
 *
 * As you would expect, the generated code is not documented and the generated
 * function names are somewhat awkward. To make the API easier to use, I
 * have wrapped some common operations with these functions:
 *
 * <ul>
 *   <li>getGoogleLicenseKey()
 *   <li>getGoogleSearchResults()
 *   <li>getGoogleSpellingSuggestion()
 *   <li>getGoogleCachedPage()
 * </ul>
 *
 * To start using this library, you must get a license key for Google's
 * Web Search API from http;//www.google.com/apis/ Once you have your key,
 * override getGoogleLicenseKey() so it returns your key. This key
 * will allow you to make 1000 queries per day through the API.
 *
 * Alternatively, you can create a preference in about:config named
 * google.GoogleSearchLicenseKey whose value is the key instead of editing
 * getGoogleLicenseKey().
 *
 * (c) 2006 Michael Bolin, bolinfest@gmail.com
 * http://www.bolinfest.com/wsdl2js/
 */

/**
 * Returns the Google Web API license key to be used by this library.
 * To obtain a license key, visit http://www.google.com/apis/
 *
 * You can either redefine this function to return the key or create a
 * preference in about:config named google.GoogleSearchLicenseKey whose value is the key.
 *
 * @return {string} license key, which looks something like: 4hMyl85QFtKx17wxuHkb/RW6H3abIl1I
 */
function getGoogleLicenseKey() {
  var branch = getGoogleLicenseKey.PREF_BRANCH;
  if (branch.prefHasUserValue('GoogleSearchLicenseKey')) {
    return branch.getCharPref('GoogleSearchLicenseKey');
  }
  // TODO: implement this function so it returns your Google Web API license key
  throw new Error("need to override getGoogleLicenseKey() or set \
the google.GoogleSearchLicenseKey preference in about:config");
}

getGoogleLicenseKey.PREF_BRANCH = Components.classes['@mozilla.org/preferences-service;1'].
                                    getService(Components.interfaces.nsIPrefService).
                                    getBranch('google.');

/**
 * getGoogleSearchResults does a basic Google query for the provided query phrase.
 * In this case, "basic" means the first 10 search results in english.
 * To tweak the query parameters, create a doGoogleSearchObj object, which
 * is a parameterizable query object that can be passed to doGoogleSearch().
 *
 * <pre>
 * // Sample use: dump URLs of Google web search results for "my search query"
 * var results = getGoogleSearchResults("my search query").resultElements;
 * for (var i = 0; i < results.length; ++i) {
 *   dump(results[i].URL);
 * }
 * </pre>
 *
 * @param query {string}
 * @return GoogleSearchResultObj
 */
function getGoogleSearchResults(/*string*/ query) {
  var params = new doGoogleSearchObj();
  params['key'] = getGoogleLicenseKey();
  params['q'] = query;
  params['start'] = 0;
  params['maxResults'] = 10;
  params['filter'] = false;
  params['restrict'] = "";
  params['safeSearch'] = false;
  params['lr'] = "";
  params['ie'] = "UTF-8";
  params['oe'] = "UTF-8";
  var result = doGoogleSearch(params);
  return result;
}

/**
 * getGoogleSpellingSuggestion takes a phrase and returns Google's
 * spelling suggestion. You are probably familiar with the
 * "Did you mean..." link that often appears at the top of a page
 * of Google web search results when a query is misspelled.
 *
 * @param phrase {string}
 * @return {string}
 */
function getGoogleSpellingSuggestion(/*string*/ phrase) {
  var params = new doSpellingSuggestionObj();
  params['key'] = getGoogleLicenseKey();
  params['phrase'] = phrase;
  return doSpellingSuggestion(params);
}

/**
 * getGoogleCachedPage takes a URL and returns the HTML for Google's cached
 * version of the page. This HTML includes the standard header/disclaimer that
 * Google adds when displaying a cached version of a page.
 *
 * @param url {string} of the page to fetch from Google's cache
 * @return {string} HTML of the cached version of the page
 */
function getGoogleCachedPage(/*string*/ url) {
  var params = new doGetCachedPageObj();
  params['key'] = getGoogleLicenseKey();
  params['url'] = url;
  return doGetCachedPage(params);
}

/* generated by wsdl2js.py (http://www.bolinfest.com/wsdl2js/) */

function GoogleSearchResultObj() {
   /*boolean*/ this["documentFiltering"] = null;
   /*string*/ this["searchComments"] = null;
   /*int*/ this["estimatedTotalResultsCount"] = null;
   /*boolean*/ this["estimateIsExact"] = null;
   /*ResultElementObj[]*/ this["resultElements"] = null;
   /*string*/ this["searchQuery"] = null;
   /*int*/ this["startIndex"] = null;
   /*int*/ this["endIndex"] = null;
   /*string*/ this["searchTips"] = null;
   /*DirectoryCategoryObj[]*/ this["directoryCategories"] = null;
   /*double*/ this["searchTime"] = null;
}

function doGetCachedPageResponseObj() {
   /*base64Binary*/ this["return"] = null;
}

function ResultElementObj() {
   /*string*/ this["summary"] = null;
   /*string*/ this["URL"] = null;
   /*string*/ this["snippet"] = null;
   /*string*/ this["title"] = null;
   /*string*/ this["cachedSize"] = null;
   /*boolean*/ this["relatedInformationPresent"] = null;
   /*string*/ this["hostName"] = null;
   /*DirectoryCategoryObj*/ this["directoryCategory"] = null;
   /*string*/ this["directoryTitle"] = null;
}

ResultElementObj.prototype.toString = function() {
  return this.URL;
}

function doGoogleSearchResponseObj() {
   /*GoogleSearchResultObj*/ this["return"] = null;
}

function doGoogleSearchObj() {
   /*string*/ this["key"] = null;
   /*string*/ this["q"] = null;
   /*int*/ this["start"] = null;
   /*int*/ this["maxResults"] = null;
   /*boolean*/ this["filter"] = null;
   /*string*/ this["restrict"] = null;
   /*boolean*/ this["safeSearch"] = null;
   /*string*/ this["lr"] = null;
   /*string*/ this["ie"] = null;
   /*string*/ this["oe"] = null;
}

function doGetCachedPageObj() {
   /*string*/ this["key"] = null;
   /*string*/ this["url"] = null;
}

function DirectoryCategoryObj() {
   /*string*/ this["fullViewableName"] = null;
   /*string*/ this["specialEncoding"] = null;
}

function doSpellingSuggestionResponseObj() {
   /*string*/ this["return"] = null;
}

function doSpellingSuggestionObj() {
   /*string*/ this["key"] = null;
   /*string*/ this["phrase"] = null;
}

/**
 * @param doGetCachedPageParam of type doGetCachedPageObj
 * @return string
 */
function doGetCachedPage(doGetCachedPageParam) {
  var call = new window.SOAPCall();
  call.transportURI = "http://api.google.com/search/beta2";

  var param0 = new window.SOAPParameter();
  param0.name = "key";
  param0.value = doGetCachedPageParam["key"];

  var param1 = new window.SOAPParameter();
  param1.name = "url";
  param1.value = doGetCachedPageParam["url"];

  var myParamArray = [param0, param1];
  call.encode(0, "doGetCachedPage", "urn:GoogleSearch", 0, null, myParamArray.length, myParamArray);
  var translation = call.invoke();

  if (translation.fault) {
    // error returned from the web service
    throw translation.fault;
  } else {
    var response = translation.getParameters(false, {});
    var value = response[0].value;
    if (value != null) value = window.atob(value);
    return value;
  }
}

/**
 * @param doSpellingSuggestionParam of type doSpellingSuggestionObj
 * @return string
 */
function doSpellingSuggestion(doSpellingSuggestionParam) {
  var call = new window.SOAPCall();
  call.transportURI = "http://api.google.com/search/beta2";

  var param0 = new window.SOAPParameter();
  param0.name = "key";
  param0.value = doSpellingSuggestionParam["key"];

  var param1 = new window.SOAPParameter();
  param1.name = "phrase";
  param1.value = doSpellingSuggestionParam["phrase"];

  var myParamArray = [param0, param1];
  call.encode(0, "doSpellingSuggestion", "urn:GoogleSearch", 0, null, myParamArray.length, myParamArray);
  var translation = call.invoke();

  if (translation.fault) {
    // error returned from the web service
    throw translation.fault;
  } else {
    var response = translation.getParameters(false, {});
    var value = response[0].value;
    return value;
  }
}

/**
 * @param doGoogleSearchParam of type doGoogleSearchObj
 * @return doGoogleSearchResponse
 */
function doGoogleSearch(doGoogleSearchParam) {
  var call = new window.SOAPCall();
  call.transportURI = "http://api.google.com/search/beta2";

  var param0 = new window.SOAPParameter();
  param0.name = "key";
  param0.value = doGoogleSearchParam["key"];

  var param1 = new window.SOAPParameter();
  param1.name = "q";
  param1.value = doGoogleSearchParam["q"];

  var param2 = new window.SOAPParameter();
  param2.name = "start";
  param2.value = doGoogleSearchParam["start"];

  var param3 = new window.SOAPParameter();
  param3.name = "maxResults";
  param3.value = doGoogleSearchParam["maxResults"];

  var param4 = new window.SOAPParameter();
  param4.name = "filter";
  param4.value = doGoogleSearchParam["filter"];

  var param5 = new window.SOAPParameter();
  param5.name = "restrict";
  param5.value = doGoogleSearchParam["restrict"];

  var param6 = new window.SOAPParameter();
  param6.name = "safeSearch";
  param6.value = doGoogleSearchParam["safeSearch"];

  var param7 = new window.SOAPParameter();
  param7.name = "lr";
  param7.value = doGoogleSearchParam["lr"];

  var param8 = new window.SOAPParameter();
  param8.name = "ie";
  param8.value = doGoogleSearchParam["ie"];

  var param9 = new window.SOAPParameter();
  param9.name = "oe";
  param9.value = doGoogleSearchParam["oe"];

  var myParamArray = [param0, param1, param2, param3, param4, param5, param6, param7, param8, param9];
  call.encode(0, "doGoogleSearch", "urn:GoogleSearch", 0, null, myParamArray.length, myParamArray);
  var translation = call.invoke();

  if (translation.fault) {
    // error returned from the web service
    throw translation.fault;
  } else {
    var temp;
    var obj0 = new doGoogleSearchResponseObj();
    var node0 = (translation.body.getElementsByTagName('doGoogleSearchResponse'))[0];
    var obj1 = new GoogleSearchResultObj();
    var node1 = (node0.getElementsByTagName('return'))[0];
      temp = node1.getElementsByTagName('documentFiltering')[0].firstChild;
      obj1['documentFiltering'] = (temp == null) ? null : (temp.nodeValue == 'true');
      temp = node1.getElementsByTagName('searchComments')[0].firstChild;
      obj1['searchComments'] = (temp == null) ? null : temp.nodeValue;
      temp = node1.getElementsByTagName('estimatedTotalResultsCount')[0].firstChild;
      obj1['estimatedTotalResultsCount'] = (temp == null) ? null : parseInt(temp.nodeValue, 10);
      temp = node1.getElementsByTagName('estimateIsExact')[0].firstChild;
      obj1['estimateIsExact'] = (temp == null) ? null : (temp.nodeValue == 'true');
      var obj2 = [];
      var node2 = (node1.getElementsByTagName('resultElements'))[0];
      // code for resultElements
      items2 = node2.getElementsByTagName('item');
      for (var i = 0; i < items2.length; i++) {
        var obj3 = new ResultElementObj();
        var node3 = items2[i];
          temp = node3.getElementsByTagName('summary')[0].firstChild;
          obj3['summary'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('URL')[0].firstChild;
          obj3['URL'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('snippet')[0].firstChild;
          obj3['snippet'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('title')[0].firstChild;
          obj3['title'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('cachedSize')[0].firstChild;
          obj3['cachedSize'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('relatedInformationPresent')[0].firstChild;
          obj3['relatedInformationPresent'] = (temp == null) ? null : (temp.nodeValue == 'true');
          temp = node3.getElementsByTagName('hostName')[0].firstChild;
          obj3['hostName'] = (temp == null) ? null : temp.nodeValue;
          var obj4 = new DirectoryCategoryObj();
          var node4 = (node3.getElementsByTagName('directoryCategory'))[0];
            temp = node4.getElementsByTagName('fullViewableName')[0].firstChild;
            obj4['fullViewableName'] = (temp == null) ? null : temp.nodeValue;
            temp = node4.getElementsByTagName('specialEncoding')[0].firstChild;
            obj4['specialEncoding'] = (temp == null) ? null : temp.nodeValue;
          obj3['directoryCategory'] = obj4;
          temp = node3.getElementsByTagName('directoryTitle')[0].firstChild;
          obj3['directoryTitle'] = (temp == null) ? null : temp.nodeValue;
        obj2.push(obj3);
      }
      obj1['resultElements'] = obj2;
      temp = node1.getElementsByTagName('searchQuery')[0].firstChild;
      obj1['searchQuery'] = (temp == null) ? null : temp.nodeValue;
      temp = node1.getElementsByTagName('startIndex')[0].firstChild;
      obj1['startIndex'] = (temp == null) ? null : parseInt(temp.nodeValue, 10);
      temp = node1.getElementsByTagName('endIndex')[0].firstChild;
      obj1['endIndex'] = (temp == null) ? null : parseInt(temp.nodeValue, 10);
      temp = node1.getElementsByTagName('searchTips')[0].firstChild;
      obj1['searchTips'] = (temp == null) ? null : temp.nodeValue;
      var obj2 = [];
      var node2 = (node1.getElementsByTagName('directoryCategories'))[0];
      // code for directoryCategories
      items2 = node2.getElementsByTagName('item');
      for (var i = 0; i < items2.length; i++) {
        var obj3 = new DirectoryCategoryObj();
        var node3 = items2[i];
          temp = node3.getElementsByTagName('fullViewableName')[0].firstChild;
          obj3['fullViewableName'] = (temp == null) ? null : temp.nodeValue;
          temp = node3.getElementsByTagName('specialEncoding')[0].firstChild;
          obj3['specialEncoding'] = (temp == null) ? null : temp.nodeValue;
        obj2.push(obj3);
      }
      obj1['directoryCategories'] = obj2;
      temp = node1.getElementsByTagName('searchTime')[0].firstChild;
      obj1['searchTime'] = (temp == null) ? null : parseFloat(temp.nodeValue);
    obj0['return'] = obj1;
    return obj0['return'];
  }
}

