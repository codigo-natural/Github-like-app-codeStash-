import User from "../models/user.model.js";

export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    // 60 request per hour, 5000 request per hour for authenticated requests
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );
    const userProfile = await userResponse.json();
    console.log("user profile:", userProfile);

    const reposResponse = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const repos = await reposResponse.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    console.log(user, "auth user");
    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res.status(404).json({ error: "User not a member" });
    }

    if (user.likedProfiles.includes(userToLike._id.toString())) {
      return res.status(400).json({ error: "User already liked" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });

    user.likedProfiles.push(userToLike.username);

    // await userToLike.save();
    // await user.save();
    await Promise.all([userToLike.save(), user.save()]);

    res.status(200).json({ message: "User liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).jso({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
