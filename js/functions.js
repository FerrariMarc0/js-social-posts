'use strict';

// Con questa funzione convertiamo una data in qualsiasi formato in una data italiana
function convertToIt(created) {
    const dates = created.split('-');
    console.log('dates', dates);
    const giorno = dates[1].padStart(2, '0');
    const mese = dates[0].padStart(2, '0');
    const anno = dates[2];
    return `${giorno}-${mese}-${anno}`;
}

function renderPost(elementHTML, postElement) {

    //destrutturazione elemento post
    const { author, created, content, media, likes, id } = postElement;
    //esempio di destrutturazione proprietà author
    const { name: nameAuthor } = author;

    //author name
    elementHTML.querySelector('.post-meta__author').innerHTML = nameAuthor;
    //date
    console.log('created', created)
    const createdAt = convertToIt(created);
    elementHTML.querySelector('.post-meta__time').innerHTML = createdAt;
    //description
    elementHTML.querySelector('.post__text').innerHTML = content;
    //image
    elementHTML.querySelector('.post__image > img').src = media;
    //likes
    const elementLikeCounter = elementHTML.querySelector('.js-likes-counter');
    elementLikeCounter.id = `like-counter-${id}`;
    elementLikeCounter.innerHTML = likes;

    const likeButton = elementHTML.querySelector('.like-button');
    likeButton.addEventListener('click', function () {
        if (likedPosts.includes(id)) {
            likeButton.classList.remove('like-button--liked');

            postElement.likes--;
            console.log('likes', postElement.likes);

            console.log('elementLikeCounter', elementLikeCounter)
            elementLikeCounter.innerHTML = postElement.likes;

            likedPosts = likedPosts.filter(element => element !== id);
            console.log('likedPosts', likedPosts)
            return;
        }

        likeButton.classList.add('like-button--liked');

        postElement.likes++;
        console.log('likes', postElement.likes);

        console.log('elementLikeCounter', elementLikeCounter)
        elementLikeCounter.innerHTML = postElement.likes;

        likedPosts.push(id);
    });

    return elementHTML;
}