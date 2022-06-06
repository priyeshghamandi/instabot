const fetch = require('node-fetch');


const Instagram = require('instagram-web-api');

const username = "<INSTAGRAM_USERNAME>";
const password  =  "<INSTAGRAM_PASSWORD>";
 
const client = new Instagram({ username, password });
let randomCommentsArray = [
    "Awesome!!",
    "Looks Great!!",
    "Would Love to try this!!",
    "Love it!!",
    "NICE!",
    "EPIC!" ,
    "Looks Amazing!",
    "💙",
    "❤️",
    "🔥😍",
    "😍🔥",
    "🔥",
    "😍",
    "❤️🔥",
    "💙️🔥",
    "❤️😍",
    "💙️😍",
    "Looks Perfect!"
];

client
    .login()
    .then(() => {
        client
            .getProfile()
            .then(() => {                
                client.getMediaFeedByHashtag({ hashtag: 'mojitococktail' })
                    .then(posts => {
                        let edges = posts.edge_hashtag_to_media.edges;
                        let commentPosts  = edges.slice(101,150);
                        let likePosts = edges.slice(151,200);

                        let interval = 100 * 1000; // 10 seconds;

                        for(let i = 0; i < commentPosts.length; i++){
                            let edge = commentPosts[i];
                            let comment = randomCommentsArray[[Math.floor(Math.random() * randomCommentsArray.length)]];
                            setTimeout(i => {
                                client.addComment({mediaId: edge.node.id, text: comment})
                                    .then(() => console.log(`${i} Added comment [${comment}] to [${edge.node.id}]`))
                                    .catch(ex => console.log("error adding commnet ", ex.message));
                            }, interval * i, i);
                        }

                        for(let i = 0; i < likePosts.length; i++){
                            let edge = likePosts[i];
                            setTimeout(i => {
                                client.like({mediaId: edge.node.id})
                                    .then(() => console.log(`${i} Post Liked  ${edge.node.id}`))
                                    .catch(ex => console.log("error liking post ", ex.message));
                            }, interval * i, i);

                        }
                    })
                    .catch(ex => console.log(ex));
            })
    })
    .catch(ex => console.log(ex));