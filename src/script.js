import sketch from 'sketch'

const lowerCaseWords = new Set(['an', 'abaft', 'about', 'above', 'afore', 'after', 'along', 'amid', 'among', 'an', 'apud', 'as', 'aside', 'at', 'atop', 'below', 'but', 'by', 'circa', 'down', 'for', 'from', 'given', 'in', 'into', 'lest', 'like', 'mid', 'midst', 'minus', 'near', 'next', 'of', 'off', 'on', 'onto', 'out', 'over', 'pace', 'past', 'per', 'plus', 'pro', 'qua', 'round', 'sans', 'save', 'since', 'than', 'thru', 'till', 'times', 'to', 'under', 'until', 'unto', 'up', 'upon', 'via', 'vice', 'with', 'worth', 'the', 'and', 'nor', 'or', 'yet', 'so'])

var changesCount = 0

export default function() {
  const selectedLayers = sketch.getSelectedDocument().selectedLayers
  if (selectedLayers.length === 0) {
    sketch.UI.message('No layers are selected.')
  } else {
    changesCount = 0
    selectedLayers.forEach(changeCase)
    sketch.UI.message(`${changesCount} text(s) changed.`)
  }
}

function changeCase(layer) {
  if (layer.type === "SymbolInstance") {
    layer.overrides
      .filter(override => override.property === "stringValue")
      .forEach(override => override.value = allWordsToTitleCase(override.value))
  } else if (layer.type === "Text") {
    layer.text = allWordsToTitleCase(layer.text)
  } else if (layer.type === "Group") {
    layer.layers.forEach(changeCase)
  }
}

function allWordsToTitleCase(string) {
  const words = string.split(" ")
  for (var i = 0; i < words.length; i++) {
    words[i] = toTitleCase(words[i])
  }
  const result = words.join(" ")
  if (result !== string) {
    changesCount++
  }
  return result
}

function toTitleCase(word) {
  if (!word) {
    return
  } else if (lowerCaseWords.has(word.toLowerCase())) {
    return word.toLowerCase()
  } else {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  }
}
