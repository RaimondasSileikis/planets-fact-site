fetch('./data.json')
    .then((response) => response.json())
    .then((planetsData) => {

    console.log(planetsData);

    const planetsList = document.querySelector('nav');
    const planets = planetsList.querySelectorAll('li');

    planets.forEach(tab => {
        tab.addEventListener('click', changePlanetLayout);
    });

    function changePlanetLayout(e) {
        const targetPlanet = e.currentTarget;
        const targetLayout = targetPlanet.getAttribute('aria-controls-planet');

        changePlanetColor(targetLayout);  
        function changePlanetColor(color) {
            const rootData = document.querySelector(':root');
            rootData.style.setProperty('--clr-planet', `var(--clr-${color})`);
        };

        const planetData = planetsData.filter(planet =>
            planet.name.toLowerCase() === targetLayout )[0];

        const overviewPicture = document.querySelector('#overview-picture > img');
        const structurePicture = document.querySelector('#structure-picture > img');
        const geologyPictureOverview = document.querySelector('#geology-picture > .img-surface > .img-owerview');
        const geologyPictureGeology = document.querySelector('#geology-picture > .img-surface > .img-geology');
        
        overviewPicture.setAttribute('src', planetData.images.planet);
        structurePicture.setAttribute('src', planetData.images.internal);
        geologyPictureOverview.setAttribute('src', planetData.images.planet);
        geologyPictureGeology.setAttribute('src', planetData.images.geology);

        const metaRotation = document.querySelector('#rotation > h2');
        const metaRevolution = document.querySelector('#revolution > h2');
        const metaRadius = document.querySelector('#radius > h2');
        const metaTemperature = document.querySelector('#temperature > h2');
        
        metaRotation.innerText = planetData.rotation;
        metaRevolution.innerText = planetData.revolution;
        metaRadius.innerText = planetData.radius;
        metaTemperature.innerText = planetData.temperature;

        const overviewContentH1 = document.querySelector('#overview-panel > h1');
        const overviewContentP = document.querySelector('#overview-panel > p')
        const overviewContentSource = document.querySelector('#overview-panel a')

        const structureContentH1 = document.querySelector('#structure-panel > h1');
        const structureContentP = document.querySelector('#structure-panel > p')
        const structureContentSource = document.querySelector('#structure-panel a')

        const geologyContentH1 = document.querySelector('#geology-panel > h1');
        const geologyContentP = document.querySelector('#geology-panel > p')
        const geologyContentSource = document.querySelector('#geology-panel a')

        overviewContentH1.innerText = planetData.name;
        overviewContentP.innerText = planetData.overview.content;
        overviewContentSource.setAttribute('href', planetData.overview.source);

        structureContentH1.innerText = planetData.name;
        structureContentP.innerText = planetData.structure.content;
        structureContentSource.setAttribute('href', planetData.structure.source);

        geologyContentH1.innerText = planetData.name;
        geologyContentP.innerText = planetData.geology.content;
        geologyContentSource.setAttribute('href', planetData.geology.source);
    };
} );