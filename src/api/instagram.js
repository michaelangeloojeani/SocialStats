import axios from "axios";

const client_id = "YOUR_CLIENT_ID";
const redirectURI = "http://localhost:3000/auth/instagram"; // Match this with Facebook Developer settings

export const getInstagramAuthURL = () => {
  return `https://www.facebook.com/v17.0/dialog/oauth?
    client_id=${client_id}&
    redirect_uri=${redirectURI}&
    scope=instagram_basic,instagram_graph_user_profile&
    response_type=token`;
};

export const getInstagramUserData = async (accessToken) => {
  try {
    const response = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${accessToken}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Instagram user data:", error);
    return null;
  }
};

export const getFollowersCount = async (instagramUserId, accessToken) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/v17.0/${instagramUserId}?fields=followers_count,follows_count&access_token=${accessToken}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers count:", error);
    return null;
  }
};
