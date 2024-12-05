export async function get_user_posts(pub_key) {

    if (!pub_key) return;

    try {
      const url = `http://192.168.1.25:3000/posts/user/${pub_key}`;
      const response = await fetch(url, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } 
      else if(response.status == 404){
        console.log("No posts found on", Topic);
      }
      else {
        console.log("Server error while getting posts:", await response.text());
      }
    } catch (e) {
      console.log("Error while getting posts:", e.message);
    }
}

export async function getUserInfo(pub_key) {
    if (!pub_key) return;
    try {

        const url = `http://192.168.1.25:3000/user/${pub_key}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.ok){

            const data = await response.json();

            return data;
        
        } else {
            console.log('Profile User Info Error:', await response.text());
        }
    } 
    catch(err)
    {
        console.log(err.message);
    }
}

async function likePost(post) {

  try {

      const url = `http://192.168.1.25:3000/like`;
      const response = await fetch(url, {
          method: 'POST'
      });

      if (response.ok){

          const data = await response.json();

          return data;
      
      } else {
          console.log('Profile User Info Error:', await response.text());
      }
  } 
  catch(err)
  {
      console.log(err.message);
  }
}


export async function get_sub_posts(post) {

  try {

    const url = `http://192.168.1.25:3000/sub_posts`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(post)
    });

    if (response.ok) {

      let data = await response.json();

      return data;
    }

    else if(response.status == 404){
      console.log("No sub posts found on", post);
    }

    else {
      console.log("Server error while getting sub posts:", await response.text());
    }
    
  } catch (e) {
    console.log("Error while getting sub posts:", e.message);
  }
}