(function () {
    const tabs = [
        {
            id: 1,
            codPapel: "AMER3",
            period: "15M",
            elementRef: null
        }
    ];

    this.activeTab = 1;
    this.elementRef = document.getElementById('lista-abas');

    this.init = () => {
        this.loadTabs();

        this.elementRef.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.elementRef.scrollLeft += e.deltaY;
        });

        window.addEventListener('keydown', function(e) {
            const tab = {
                id: new Date().getTime(),
                codPapel: 'ADC',
                period: "1M",
                elementRef: null
            };

            if (e.ctrlKey) {
                tab.elementRef = addTabElement(tab, tabs[2]);
                tabs.splice(2, 0, tab);
            } else {
                tab.elementRef = addTabElement(tab);
                tabs.push(tab);
            }

            setActiveTab(tab);
        });
    }

    this.loadTabs = () => {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].elementRef = addTabElement(tabs[i]);
        }
    }

    const addTabElement = (tab, beforeTab = null) => {
        const tabElement = document.createElement('li');
        tabElement.className = this.activeTab === tab.id ? "item aba ativa" : "item aba";

        const colImageElement = document.createElement('div');
        colImageElement.className = 'col-img';
        colImageElement.innerHTML = `<span class="imagem-nao-encontrada">${tab.codPapel[0]}</span>`;

        const colInfoElement = document.createElement('div');
        colInfoElement.className = 'col-info';
        colInfoElement.innerHTML = `<span>${tab.codPapel}:${tab.period}</span>`;

        const colActionsElement = document.createElement('div');
        colActionsElement.className = 'col-action';

        const btnCloseElement = document.createElement('i');
        btnCloseElement.className = 'fa-solid fa-xmark';
        btnCloseElement.onclick = () => {
            removeTabElement(tab);
        }

        tabElement.addEventListener('click', (e) => {
            if (this.activeTab !== tab.id && e.target != btnCloseElement) {
                setActiveTab(tab);
            }
        });

        colActionsElement.appendChild(btnCloseElement);
        tabElement.appendChild(colImageElement);
        tabElement.appendChild(colInfoElement);
        tabElement.appendChild(colActionsElement);

        if (beforeTab) {
            beforeTab.elementRef.before(tabElement);
        } else {
            this.elementRef.appendChild(tabElement);
        }

        return tabElement;
    }

    const removeTabElement = (tab) => {
        const index = tabs.findIndex((t) => t.id === tab.id);
        tabs.splice(index, 1);

        tab.elementRef.remove();

        if (this.activeTab === tab.id) {
            let newActiveTab = tabs[index];

            if (!newActiveTab) {
                newActiveTab = tabs[index - 1];
            }

            if (tabs.length > 0) {
                setActiveTab(newActiveTab);
            }
        }
    }

    const setActiveTab = (tab) => {
        this.activeTab = tab.id;

        this.elementRef.querySelectorAll('.ativa').forEach((t) => {
            t.classList.remove('ativa');
        });

        tab.elementRef.classList.add('ativa');
    }

    this.init();
})()