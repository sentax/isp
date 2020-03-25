let launcher;
const ready = () => {
    launcher = new ISP_Launcher();
    window.isp = launcher;
    launcher.createDesktop('default').render().createWindow().render();

    setTimeout(() => {
        launcher.desktops['default'].createWindow({
            x: `${Math.floor(Math.random() * 1500)}px`,
            y: `${Math.random() * 800}px`,
            width: `${Math.random() * 1000}px`,
            height: `${Math.random() * 800}px`
        }).render();
    }, 100)
};


//Launcher class
class ISP_Launcher {
    constructor() {
        this.desktops = {};
        this.windowCounter = 0;
        this.currentDesktop = null;
    }

    createDesktop(name, list = {}) {
        this.desktops[name] = new ISP_Desktop(this, {name: name});
        if (this.currentDesktop === null)
            this.currentDesktop = name;
        return this.desktops[name];
    }

}

//Desktop class
class ISP_Desktop {
    constructor(parent, props = {}) {
        this.parent = parent;
        this.props = JSON.parse(JSON.stringify(props));
        this.windows = {};
        this.currentzIndex = 0;
    }

    createWindow(props = {}) {
        const id = this.parent.windowCounter++;
        this.windows[id] = new ISP_WINDOW(this, {id: id, ...props});
        return this.windows[id];
    }

    render() {
        const desktopElement = document.createElement('div');
        desktopElement.className = `isp-desktop`;
        desktopElement.id = `isp-desktop-${this.props.name}`;
        document.getElementById('isp-desktops').appendChild(desktopElement);
        return this;
    }

}

//window class
class ISP_WINDOW {
    constructor(parent, props = {}) {
        this.parent = parent;
        this.props = JSON.parse(JSON.stringify(props));
    }

    bringUp() {
        document.getElementById(`isp-window-${this.props.id}`).style.zIndex = this.parent.currentzIndex++;
    }

    toggleFullScreen() {
        this.setFullScreen(!this.fullScreen)
    }

    setMinimized(status) {
        const element = document.getElementById(`isp-window-${this.props.id}`);
        this.minimized = status;

        if (status) {
            this.lastStats = {
                translate: `${element.getAttribute('data-x')}px,${element.getAttribute('data-y')}px`,
                width: element.style.width,
                height: element.style.height,
                zIndex: element.style.zIndex,
                scale: 1,
            };

            const tween = KUTE.to(element, {
                scale: 0
            }, {yoyo: true, duration: 110});
            tween.start();
        } else {
            this.minimized = false;
            const tween = KUTE.to(element, this.lastStats, {yoyo: true, duration: 110});
            tween.start();
        }

    }

    setFullScreen(status) {
        const element = document.getElementById(`isp-window-${this.props.id}`);
        this.fullScreen = status;

        if (status) {
            this.lastStats = {
                translate: `${element.getAttribute('data-x')}px,${element.getAttribute('data-y')}px`,
                width: element.style.width,
                height: element.style.height,
                zIndex: element.style.zIndex
            };
            const tween = KUTE.to(element, {
                zIndex: element.style.zIndex,
                translate: `(0px,0px)`,
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight - 40}px`,
            }, {yoyo: true, duration: 110});
            tween.start();
        } else {
            this.fullScreen = false;
            const tween = KUTE.to(element, this.lastStats, {yoyo: true, duration: 110});
            tween.start();
        }

    }

    render() {
        const windowElement = document.createElement('div');
        windowElement.onmousedown = this.bringUp.bind(this);
        windowElement.className = 'isp-window bg-paper';
        windowElement.id = `isp-window-${this.props.id}`;
        windowElement.style.minWidth = `${this.props.minWidth || 300}px`;
        windowElement.style.minHeight = `${this.props.minHeight || 250}px`;
        windowElement.style.width = `${this.props.width || '400px'}`;
        windowElement.style.height = `${this.props.height || '300px'}`;
        windowElement.setAttribute('data-x', this.props.x || 10);
        windowElement.setAttribute('data-y', this.props.y || 10);
        const titleBarElement = document.createElement('div');
        titleBarElement.className = 'isp-title-bar';
        titleBarElement.ondblclick = () => {
            this.toggleFullScreen()
        };
        titleBarElement.setAttribute('data-id-index', this.props.id);
        titleBarElement.innerHTML = `
      <span class="title-bar-text">${this.props.title || 'Untitled'}</span>
      <div class="title-bar-actions">
        <button class="action-button minimize" onclick="launcher.desktops['${this.parent.props.name}'].windows['${this.props.id}'].setMinimized(true)">_</button>
        <button class="action-button full-screen" onclick="launcher.desktops['${this.parent.props.name}'].windows['${this.props.id}'].toggleFullScreen()">◘</button>
        <button class="action-button close">X</button>
      </div>

    `;
        const contentElement = document.createElement('div');
        contentElement.className = `isp-window-content`;
        contentElement.innerHTML = `aaa sina buyurdilar
    <div class="resize-right resize-right-style"></div>
  <div class="resize-bottom resize-bottom-style"></div>
  <div class="resize-bottom resize-right resize-corner-style"></div>

    `;
        windowElement.appendChild(titleBarElement);
        windowElement.appendChild(contentElement);
        document.getElementById(`isp-desktop-${this.parent.props.name}`).appendChild(windowElement);
        this.registerBoundings(this.props.x, this.props.y);
        const tween = KUTE.fromTo(windowElement, {scale: 0.2, translateX: 0, translateY: 0}, {
            scale: 1,
            translateX: this.props.x || 10,
            translateY: this.props.y || 10
        }, {yoyo: true, duration: 150});
        tween.start();
        return this;
    }

    registerBoundings(defaultX = 10, defaultY = 10) {
        interact(`#isp-window-${this.props.id}`)
            .resizable({
                // resize from all edges and corners
                edges: {
                    top: '.resize-top',
                    left: '.resize-left',
                    bottom: '.resize-bottom',
                    right: '.resize-right'
                },

                listeners: {
                    move(event) {
                        const target = event.target;
                        let x = (parseFloat(target.getAttribute('data-x')) || defaultX);
                        let y = (parseFloat(target.getAttribute('data-y')) || defaultY);

                        // update the element's style
                        target.style.width = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                    }
                },
                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: 'parent'
                    }),

                    // minimum size
                    interact.modifiers.restrictSize({
                        min: {width: this.props.minWidth || 300, height: this.props.minHeight || 250}
                    })
                ],

                inertia: false
            });
        interact(`#isp-window-${this.props.id} .isp-title-bar`).draggable({
            listeners: {
                move: window.dragMoveListener,
                // end: (event) => {
                //     const mouse = {...event.client};
                //     if (mouse.y < 20) {
                //         this.setFullScreen(true)
                //     } else if (mouse.x < 10) {
                //         indicatorMove('left')
                //     } else if (mouse.x > window.innerWidth - 10) {
                //         indicatorMove('right')
                //     } else {
                //         this.setFullScreen(false)
                //
                //
                //     }
                // }
            },
            inertia: false,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: '.isp-desktop',
                    endOnly: true
                })
            ]
        })

    }


}


//dragging helpers, just copied from interactive docs :)
function dragMoveListener(event) {
    const target = document.getElementById('isp-window-' + event.target.getAttribute('data-id-index'));
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    const mouse = {...event.client};
    // if (mouse.y < 10) {
    //     indicatorMove('top')
    // } else if (mouse.x < 10) {
    //     indicatorMove('left')
    // } else if (mouse.x > window.innerWidth - 10) {
    //     indicatorMove('right')
    // } else {
    //     indicatorMove('hide')
    //
    // }

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

let indicatiorStatus = 'hide';

function indicatorMove(direction) {
    if (indicatiorStatus === direction)
        return false
    indicatiorStatus = direction;
    const element = document.getElementById('isp-window-indicator');
    switch (direction) {
        case 'top':
            full();
            break;
        case 'left':
            half('left')
            break;
        case 'bottom':
            break;
        case 'right':
            half('right')
            break;
        case 'hide':
            element.style.width = '0px';
            element.style.height = '0px';
            break;
    }

    function full() {
        const tween = KUTE.to(element, {
            width: `${window.innerWidth}px`,
            translateX: `0px`,
            height: `${window.innerWidth}px`
        }, {
            yoyo: true,
            duration: 50
        });
        tween.start();
    }

    function half(side) {
        let tween;
        if (side === 'left')
            tween = KUTE.to(element, {
                width: `${window.innerWidth / 2}px`,
                translateX: `0px`,
                height: `${window.innerWidth}px`
            }, {
                yoyo: true,
                duration: 50
            });
        if (side === 'right')
            tween = KUTE.to(element, {
                width: `${window.innerWidth / 2}px`,
                translateX: `${window.innerWidth / 2}px`,
                height: `${window.innerWidth}px`
            }, {
                yoyo: true,
                duration: 50
            });
        tween.start();

    }
}


// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
window.onload = ready;
