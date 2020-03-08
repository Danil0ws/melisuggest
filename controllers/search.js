const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const cachios = require('cachios');
const md5 = require('md5');

module.exports = function(app) {
  this.getSuggests = async (query) => {
    return await cachios.get('https://invers.us/melihacking/api/keywords/search?keyword='+encodeURIComponent(query)+'&site=MLB&category=all&language=pt-BR&type=suggests');
  },
  this.getAllSuggests = async (urls) => {
    return await Promise.all(urls);
  },
  this.autoSuggests = function(query) {
    var suggestedCallBack = [];
    var multiplesSuggestedOne = Array();
    var suggestedCallBackWords = Array();
    var suggestedCallBacksSuggest = Array();
    this.getSuggests(query)
      .then(function (responseOne) {
        let responseRowsOne = responseOne.data.suggested_queries;    
        var suggestedCallBackWordsOne = Array();
        var suggestedCallBacksSuggestOne = Array();
        suggestedCallBack['keyword'] = responseOne.data.q;
        responseRowsOne.forEach(elementOne => {
          if(responseOne.data.q!=elementOne.q) {
            var idmd5 = md5(elementOne.q);
            suggestedCallBacksSuggestOne.push({'query': elementOne.q, 'id': idmd5, 'match_start' : elementOne.match_start, 'match_end' : elementOne.match_end});
            suggestedCallBackWordsOne.push(elementOne.q);
            let urlSuggestedOne = 'https://api.mercadolibre.com/sites/MLB/autosuggest?showFilters=false&api_version=3&q='+encodeURIComponent(elementOne.q)+'&limit=10';
            multiplesSuggestedOne.push(cachios.get(urlSuggestedOne));
          }
        });
        suggestedCallBackWords.push(suggestedCallBackWordsOne);
        suggestedCallBacksSuggest.push(suggestedCallBacksSuggestOne);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.info(suggestedCallBackWords);
    var multiplesSuggestedTwo = Array();
    app.controllers.search.getAllSuggests(multiplesSuggestedOne)
      .then(function(responseAllTwo) {
          var suggestedCallBackWordsTwo = Array();
          var suggestedCallBacksSuggestTwo = Array();
          responseAllTwo.forEach(elementAllTwo => {
              let responseRowsTwo = elementAllTwo.data.suggested_queries;
              responseRowsTwo.forEach(elementTwo => {
                  if (elementAllTwo.data.q != elementTwo.q) {
                      var idmd5 = md5(elementTwo.q);
                      suggestedCallBacksSuggestTwo.push({
                          'query': elementTwo.q,
                          'id': idmd5,
                          'match_start': elementTwo.match_start,
                          'match_end': elementTwo.match_end
                      });
                      suggestedCallBackWordsTwo.push(elementTwo.q);
                      let urlSuggestedTwo = 'https://api.mercadolibre.com/sites/MLB/autosuggest?showFilters=false&api_version=3&q=' + encodeURIComponent(elementTwo.q) + '&limit=5';
                      multiplesSuggestedTwo.push(cachios.get(urlSuggestedTwo));
                  }
              });
          });
          suggestedCallBackWords.push(suggestedCallBackWordsTwo);
          suggestedCallBacksSuggest.push(suggestedCallBacksSuggestTwo)
      })
      .catch(function(error) {
          console.log(error);
      });
    app.controllers.search.getAllSuggests(multiplesSuggestedTwo)
      .then(function(responseAllTree) {
          var suggestedCallBackWordsTree = Array();
          var suggestedCallBacksSuggestTree = Array();
          responseAllTree.forEach(elementAllTree => {
              let responseRowsTree = elementAllTree.data.suggested_queries;
              responseRowsTree.forEach(elementTree => {
                  if (elementAllTree.data.q != elementTree.q) {
                      var idmd5 = md5(elementTree.q);
                      suggestedCallBacksSuggestTree.push({
                          'query': elementTree.q,
                          'id': idmd5,
                          'match_start': elementTree.match_start,
                          'match_end': elementTree.match_end
                      });
                      suggestedCallBackWordsTree.push(elementTree.q);
                  }
              });
          });
          suggestedCallBackWords.push(suggestedCallBackWordsTree);
          suggestedCallBacksSuggest.push(suggestedCallBacksSuggestTree)
      })
      .catch(function(error) {
          console.log(error);
      });
  }
  return this;
};