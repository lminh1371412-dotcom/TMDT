const menuItem = Array.from(document.querySelectorAll('.menu__item')).slice(-3)

const activeMenuItem = localStorage.getItem('activeMenuItem')
menuItem.forEach(item => {
    item.addEventListener('click', () => {
        localStorage.removeItem('activeMenuItem')
        localStorage.setItem('activeMenuItem', item.className)
    })

    if (item.className == activeMenuItem) {
        item.classList.add('active-menu-item')
        menuItem.forEach(ele => {
            if (ele != item)
                ele.classList.remove('active-menu-item')
        })
    }
})

// for menu__item localStorge
const url = location.pathname + location.search;
if (url != '/search/results?hotProduct=true'
    && url != '/search/results?discount=true'
    && url != '/about-us') {
    if (activeMenuItem) {
        let activeItem = document.querySelector(`.${activeMenuItem.replaceAll(' ', '.')}`)
        activeItem.classList.remove('active-menu-item')
    }
}