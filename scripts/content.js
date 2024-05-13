function waitForElement(selector, callback) {
    var element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      setTimeout(function() {
        waitForElement(selector, callback);
      }, 1000); 
    }
  }
let playlist;
let chat;
let related;

waitForElement("#comments", function(comments) {
    waitForElement("#secondary-inner", function(secondary) {
        for (const child of secondary.children){
          if (child.id === "chat-container"){
            chat = child
          }
          if (child.id === "playlist"){
            playlist = child
          } 
          if (child.id === "related"){
            related = child
          }
        }
        secondary.innerHTML = `
        <div class="tab-container">
            <ul class="tabs">
                <li class="active comment">Comments</li>
                <li class="related">Related Videos</li>
                <li class="chat">Live Chat</li>
                <li class="playlist">Playlist</li>
            </ul>
        <div class="comment-content">
        </div>
        <div class="chat-content">
        </div>
        <div class="playlist-content">
        </div>
        <div class="related-content">
        </div>
      </div>`
        comments.remove()
        var commentTab = document.querySelector("#secondary-inner > div > ul > li.comment")
        var relatedTab = document.querySelector("#secondary-inner > div > ul > li.related")
        var playlistTab = document.querySelector("#secondary-inner > div > ul > li.playlist")
        var chatTab = document.querySelector("#secondary-inner > div > ul > li.chat")
        
        var commentContent = document.querySelector("#secondary-inner > div > div.comment-content")
        var relatedContent = document.querySelector("#secondary-inner > div > div.related-content")
        var playlistContent = document.querySelector("#secondary-inner > div > div.playlist-content")
        var chatContent = document.querySelector("#secondary-inner > div > div.chat-content")

        waitForElement('#secondary-inner > div > div.comment-content', function(element) {
            // commentContent = element                        
            element.appendChild(comments)
        })
        waitForElement("#secondary-inner > div > div.related-content", function(element) {
            // relatedContent = element
            element.appendChild(related)
            relatedContent.classList.add('hide')
        })
        waitForElement("#secondary-inner > div > div.playlist-content", function(element) {
            // playlistContent = element
            element.appendChild(playlist)
            playlistContent.classList.add('hide')
        })
        waitForElement("#secondary-inner > div > div.chat-content", function(element) {
            // chatContent = element
            element.appendChild(chat)
            chatContent.classList.add('hide')
        })

        commentTab.addEventListener('click', function(){
            commentContent.classList.remove('hide')
            relatedContent.classList.add('hide')
            playlistContent.classList.add('hide')
            chatContent.classList.add('hide')

            commentTab.classList.add('active')
            playlistTab.classList.remove('active')
            relatedTab.classList.remove('active')
            chatTab.classList.remove('active')
        })

        relatedTab.addEventListener('click', function(){
            commentContent.classList.add('hide')
            chatContent.classList.add('hide')
            playlistContent.classList.add('hide')
            relatedContent.classList.remove('hide')

            commentTab.classList.remove('active')
            playlistTab.classList.remove('active')
            relatedTab.classList.add('active')
            chatTab.classList.remove('active')
        })

        playlistTab.addEventListener('click', function(){
            commentContent.classList.add('hide')
            relatedContent.classList.add('hide')
            chatContent.classList.add('hide')
            playlistContent.classList.remove('hide')

            commentTab.classList.remove('active')
            relatedTab.classList.remove('active')
            playlistTab.classList.add('active')
            chatTab.classList.remove('active')
        })

        chatTab.addEventListener('click', function(){
            commentContent.classList.add('hide')
            playlistContent.classList.add('hide')
            relatedContent.classList.add('hide')
            chatContent.classList.remove('hide')

            commentTab.classList.remove('active')
            relatedTab.classList.remove('active')
            playlistTab.classList.remove('active')
            chatTab.classList.add('active')
        })
    })
  })
