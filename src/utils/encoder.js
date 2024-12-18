import { get_hash } from '@/wasm/wasm'

export function hexToBase64(hex) {
    if (!hex) return;
    
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    const binaryString = String.fromCharCode(...bytes);
    return btoa(binaryString);
}

export function base64ToHex(bs64) {
    if (!bs64) return;
    const binaryString = atob(bs64);

    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    let hexString = '';
    byteArray.forEach(byte => {
        hexString += byte.toString(16).padStart(2, '0');
    });

    return hexString;
}

export function timestampToDate(timestamp) {

    const date = new Date(timestamp * 1000);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

export function getPostHash(post){
    
    const post_h = `${post.past_hash}:${post.pub_key}:${post.subject}:${post.message}:${post.time}`

    return get_hash(post_h);
}

export function getSubPostHash(sub_post){

    let current_post = sub_post;
    let hash;
    while(current_post){
        
        hash = getPostHash(current_post);
        if (current_post.post){
            current_post.post.past_hash = hash;
        }
        current_post = current_post.post;
    }

    return hash;
    
}

function lenPost(post) {
    let len = 0;

    while (post) {
        len++;
        post = post.post;
    }

    return len;
}

export function nthPost(post, nth) {
    
    let current_post = post;
    let len = lenPost(post);
    if (len === 0) return null;

    nth = ((nth % len) + len) % len;
    
    for (let i = 0; i < nth; i++) {
        current_post = current_post.post;
    }

    return current_post;
}

export function formatPost(post) {
    if (!post) return;
    let copy_post = structuredClone(post);
    let current_post = copy_post;

    while (current_post) {
        current_post.pub_key = current_post.account.pub_key;
        ['account', 'likes', 'posts'].forEach(f => delete current_post[f]);

        current_post = current_post.post;
    }

    return copy_post;
}

export function addLinkedList(list, post){
    list = structuredClone(list);

    nthPost(list, -1).post = post

    return list;
}