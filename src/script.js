var lowerCaseWords = ['a', 'abaft', 'about', 'above', 'afore', 'after', 'along', 'amid', 'among', 'an', 'apud', 'as', 'aside', 'at', 'atop', 'below', 'but', 'by', 'circa', 'down', 'for', 'from', 'given', 'in', 'into', 'lest', 'like', 'mid', 'midst', 'minus', 'near', 'next', 'of', 'off', 'on', 'onto', 'out', 'over', 'pace', 'past', 'per', 'plus', 'pro', 'qua', 'round', 'sans', 'save', 'since', 'than', 'thru', 'till', 'times', 'to', 'under', 'until', 'unto', 'up', 'upon', 'via', 'vice', 'with', 'worth', 'the', 'and', 'nor', 'or', 'yet', 'so']

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

var toTitleCase = function (string) {
    // capitalize each word
  string = string.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return capitalize(txt)
  })

  // lowercase conjunctions
  var i, j
  for (i = 0, j = lowerCaseWords.length; i < j; i++) {
    var lowerCaseWord = lowerCaseWords[i]
    var regex = new RegExp('\\s' + capitalize(lowerCaseWord) + '\\s', 'g')
    string = string.replace(regex, function (txt) {
      return txt.toLowerCase()
    })
  }

  return string
}

var eachTextLayer = function (layers) {
  var layer

  for (var i = 0; i < layers.count(); i++) {
    layer = layers[i]
    if (layer.class() === MSTextLayer) {
      var string = layer.stringValue()
      var titleCaseString = toTitleCase(string)
      layer.setStringValue(titleCaseString)
    }
  }
}

export default function (context) {
  var doc = context.document
  var selection = context.selection
  if (selection.count() === 0) {
    doc.showMessage('Select at least one text layer')
    return
  }
  eachTextLayer(selection)
}

