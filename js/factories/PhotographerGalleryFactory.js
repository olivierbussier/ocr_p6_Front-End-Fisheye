import { LightBoxFactory } from "./LightBoxFactory.js"

export class Video {
    constructor(name, likes, src, type = 'thumb') {
        var controls
        if (type === 'thumb') {
            controls = 'class="media" controls'
        } else if (type === 'full') {
            controls = 'class="img-full" controls'
        } else {
            throw("erreur")
        }
        this._html =
        `<video ${controls}>
            <source src="assets/gallery/${name}/${src}" aria-label="${likes} likes">
        </video>`
    }
}

export class Image {
    constructor(name, likes, src, type = 'thumb') {
        if (type === 'thumb') {
            this._html = `<img class="media" src="assets/gallery/${name}/medium/${src}" alt="${likes} likes">`
        } else if (type === 'full') {
            this._html = `<img class="img-full" src="assets/gallery/${name}/${src}" alt="${src} likes">`

        } else {
            throw("erreur")
        }
    }
}

class PhotographerMediaFactory {
    constructor(name, image) {
        this._image = image
        this._name = name
    }
    getDOM() {
        const image = this._image.image
        const video = this._image.video
        const title = this._image.title
        const likes = this._image.likes
        const id    = this._image.id

        let media

        if (image) {
            media = new Image(this._name, likes, image)
        }
        if (video) {
            media = new Video(this._name, likes, video)
        }

        const section = this.createSection()

        section.innerHTML =
        `<div class="image-card">
            ${media._html}
            <div class="card-image-header">
                <h3>${title}</h3>
                <div>
                    <span>${likes}</span>
                    <img tabindex="0" class="increment-likes heart" data-id="${id}" src="assets/icons/heart.svg" alt="Incrémenter le compteur de likes">
                </div>
            </div>
        </div>`
        return section
    }
    createSection() {
        const section = document.createElement( 'section' )
        section.setAttribute('class', 'image-thumb')
        return section
    }
    getEmptyMedia() {
        return this.createSection()
    }
}

export class PhotographerGalleryFactory {
    constructor(name, images) {
        this._images = images
        this._name = name

    }

    // Function used to track click on image

    getDOM() {

        // Article creation
        const div = document.createElement( 'section' );
        div.setAttribute("class","photograph-gallery")

        const lbf = new LightBoxFactory(this._name, this._images)

        this._images.forEach((image) => {
            const im = new PhotographerMediaFactory(this._name, image).getDOM()
            const target = im.querySelector('.media')
            // Mise en place des evt d'affichage des images entières
            target.addEventListener('click', (event) => {
                lbf.listenImage(event)
            })
            div.appendChild(im)
        })
        div.appendChild(new PhotographerMediaFactory(null, null).createSection());

        return div
    }
}