var h = require('hyperscript')

/*
element classes are set with BEM convention.
https://css-tricks.com/bem-101/

B = block. module name, on the top level of the component.
E = element. a specific part of the component
M = modifier. something that changes an element (or block)
*/

module.exports = function () {

  var names = []
  var tabs = h('div.row.hypertabs__tabs')
  var content = h('div.column.hypertabs__content')

  var d = h('div.hypertabs.column',
    tabs, content
  )

  d.add = function (name, tab, change) {
    names.push(name)
    tabs.appendChild(h('div', h('a', name, {href: '#', onclick: function (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      d.select(name)
    }})))
    tab.style.display = 'none'
    content.appendChild(tab)
    if(change !== false) d.select(name)
  }

  d.has = function (name) {
    return !!~names.indexOf(name)
  }

  d.select = function (name) {
    selected = name
    var i = names.indexOf(name)
    if(!~i) return console.log('unknown tab:'+name + ' expected:' + JSON.stringify(names) + i)
    ;[].forEach.call(tabs.children, function (el) {
      el.classList.remove('hypertabs--selected')
    })
    tabs.children[i].classList.add('hypertabs--selected')
    ;[].forEach.call(content.children, function (tab) {
      tab.style.display = 'none'
    })
    content.children[i].style.display = 'flex'
  }

  d.remove = function (name) {
    var i = names.indexOf(name)
    if(!~i) return
    names.splice(i, 1)
    tabs.removeChild(tabs.children[i])
    content.removeChild(content.children[i])
    if(selected === name)
      d.select(names[i] || names[0])
  }

  d.tabs = names

  return d
}

