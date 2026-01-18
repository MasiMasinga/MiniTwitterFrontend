import { useState } from "react";
import { useNavigate } from "react-router";

// Mui
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

// Mui Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";

// React Hook Form
import { Controller, useForm } from "react-hook-form";

// Zod
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Services
import AuthService from "../../services/auth/auth.service";
import TokenService from "../../services/localstorage.service";

interface User {
    id: string;
    name: string;
    username: string;
    avatar?: string;
}

interface Comment {
    id: string;
    content: string;
    author: User;
    createdAt: string;
    likes: number;
    retweets: number;
    isLiked: boolean;
    isRetweeted: boolean;
}

interface Tweet {
    id: string;
    content: string;
    author: User;
    createdAt: string;
    likes: number;
    retweets: number;
    comments: Comment[];
    isLiked: boolean;
    isRetweeted: boolean;
}

const tweetSchema = zod.object({
    content: zod.string().min(1, { message: "Tweet cannot be empty" }).max(280, { message: "Tweet cannot exceed 280 characters" }),
});

const commentSchema = zod.object({
    content: zod.string().min(1, { message: "Comment cannot be empty" }).max(280, { message: "Comment cannot exceed 280 characters" }),
});

type TweetValues = zod.infer<typeof tweetSchema>;
type CommentValues = zod.infer<typeof commentSchema>;

const currentUser: User = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatar: undefined,
};

const dummyTweets: Tweet[] = [
    {
        id: "1",
        content: "Just launched my new project! Excited to share it with everyone. #coding #webdev",
        author: {
            id: "2",
            name: "Jane Smith",
            username: "janesmith",
        },
        createdAt: "2h",
        likes: 42,
        retweets: 12,
        comments: [
            {
                id: "1-1",
                content: "Congratulations! This looks amazing!",
                author: {
                    id: "3",
                    name: "Bob Johnson",
                    username: "bobjohnson",
                },
                createdAt: "1h",
                likes: 5,
                retweets: 1,
                isLiked: false,
                isRetweeted: false,
            },
        ],
        isLiked: false,
        isRetweeted: false,
    },
    {
        id: "2",
        content: "Beautiful sunset today! 🌅 Nature never fails to amaze me.",
        author: {
            id: "4",
            name: "Alice Williams",
            username: "alicew",
        },
        createdAt: "5h",
        likes: 89,
        retweets: 23,
        comments: [],
        isLiked: true,
        isRetweeted: false,
    },
    {
        id: "3",
        content: "Working on a new feature for the app. Can't wait to show you all! Stay tuned.",
        author: {
            id: "5",
            name: "Charlie Brown",
            username: "charlieb",
        },
        createdAt: "1d",
        likes: 156,
        retweets: 45,
        comments: [
            {
                id: "3-1",
                content: "Looking forward to it!",
                author: currentUser,
                createdAt: "12h",
                likes: 3,
                retweets: 0,
                isLiked: true,
                isRetweeted: false,
            },
            {
                id: "3-2",
                content: "Can you give us a sneak peek?",
                author: {
                    id: "6",
                    name: "Diana Prince",
                    username: "dianap",
                },
                createdAt: "10h",
                likes: 8,
                retweets: 2,
                isLiked: false,
                isRetweeted: false,
            },
        ],
        isLiked: false,
        isRetweeted: true,
    },
];

const Home = () => {
    const navigate = useNavigate();
    const [tweets, setTweets] = useState<Tweet[]>(dummyTweets);
    const [expandedComments, setExpandedComments] = useState<{ [tweetId: string]: boolean }>({});
    const [commentForms, setCommentForms] = useState<{ [tweetId: string]: boolean }>({});

    const handleLogout = async () => {
        try {
            await AuthService.Logout({});
            TokenService.removeUser();
            navigate("/");
        } catch (error) {
            TokenService.removeUser();
            navigate("/");
        }
    };

    const {
        control: tweetControl,
        handleSubmit: handleTweetSubmit,
        formState: { errors: tweetErrors },
        reset: resetTweet,
    } = useForm<TweetValues>({
        defaultValues: { content: "" },
        resolver: zodResolver(tweetSchema),
    });

    const onCreateTweet = (data: TweetValues) => {
        const newTweet: Tweet = {
            id: Date.now().toString(),
            content: data.content,
            author: currentUser,
            createdAt: "now",
            likes: 0,
            retweets: 0,
            comments: [],
            isLiked: false,
            isRetweeted: false,
        };
        setTweets([newTweet, ...tweets]);
        resetTweet();
    };

    const handleLike = (tweetId: string, isComment: boolean = false, commentId?: string) => {
        setTweets((prevTweets) =>
            prevTweets.map((tweet) => {
                if (isComment && commentId) {
                    return {
                        ...tweet,
                        comments: tweet.comments.map((comment) =>
                            comment.id === commentId
                                ? {
                                    ...comment,
                                    isLiked: !comment.isLiked,
                                    likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                                }
                                : comment
                        ),
                    };
                } else if (tweet.id === tweetId) {
                    return {
                        ...tweet,
                        isLiked: !tweet.isLiked,
                        likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
                    };
                }
                return tweet;
            })
        );
    };

    const handleRetweet = (tweetId: string, isComment: boolean = false, commentId?: string) => {
        setTweets((prevTweets) =>
            prevTweets.map((tweet) => {
                if (isComment && commentId) {
                    return {
                        ...tweet,
                        comments: tweet.comments.map((comment) =>
                            comment.id === commentId
                                ? {
                                    ...comment,
                                    isRetweeted: !comment.isRetweeted,
                                    retweets: comment.isRetweeted ? comment.retweets - 1 : comment.retweets + 1,
                                }
                                : comment
                        ),
                    };
                } else if (tweet.id === tweetId) {
                    return {
                        ...tweet,
                        isRetweeted: !tweet.isRetweeted,
                        retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1,
                    };
                }
                return tweet;
            })
        );
    };

    const toggleComments = (tweetId: string) => {
        setExpandedComments((prev) => ({
            ...prev,
            [tweetId]: !prev[tweetId],
        }));
    };

    const toggleCommentForm = (tweetId: string) => {
        setCommentForms((prev) => ({
            ...prev,
            [tweetId]: !prev[tweetId],
        }));
    };

    const CommentForm = ({ tweetId }: { tweetId: string }) => {
        const {
            control,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm<CommentValues>({
            defaultValues: { content: "" },
            resolver: zodResolver(commentSchema),
        });

        const onSubmit = (data: CommentValues) => {
            const newComment: Comment = {
                id: `${tweetId}-${Date.now()}`,
                content: data.content,
                author: currentUser,
                createdAt: "now",
                likes: 0,
                retweets: 0,
                isLiked: false,
                isRetweeted: false,
            };

            setTweets((prevTweets) =>
                prevTweets.map((tweet) =>
                    tweet.id === tweetId
                        ? { ...tweet, comments: [...tweet.comments, newComment] }
                        : tweet
                )
            );
            reset();
            setCommentForms((prev) => ({ ...prev, [tweetId]: false }));
        };

        return (
            <Box sx={{ mt: 2, pl: 7 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Controller
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="Write a comment..."
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.content}
                                    helperText={errors.content?.message}
                                    sx={{ flex: 1 }}
                                />
                            )}
                        />
                        <IconButton type="submit" color="primary" sx={{ mt: 0.5 }}>
                            <SendIcon />
                        </IconButton>
                    </Stack>
                </form>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                pb: 4,
            }}
        >
            <Container maxWidth="md" sx={{ pt: 4 }}>
                <Stack spacing={3}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                            Home
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <IconButton
                                onClick={() => navigate("/profile")}
                                sx={{
                                    color: "#2C6EF9",
                                    "&:hover": { backgroundColor: "rgba(44, 110, 249, 0.1)" },
                                }}
                            >
                                <AccountCircleIcon sx={{ fontSize: 32 }} />
                            </IconButton>
                            <IconButton
                                onClick={handleLogout}
                                sx={{
                                    color: "#ef4444",
                                    "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" },
                                }}
                                title="Logout"
                            >
                                <LogoutIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                            backgroundColor: "white",
                        }}
                    >
                        <form onSubmit={handleTweetSubmit(onCreateTweet)}>
                            <Stack spacing={2}>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#2C6EF9",
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {currentUser.name.charAt(0)}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Controller
                                            control={tweetControl}
                                            name="content"
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    placeholder="What's happening?"
                                                    variant="outlined"
                                                    error={!!tweetErrors.content}
                                                    helperText={tweetErrors.content?.message}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            "& fieldset": {
                                                                borderColor: "#e0e0e0",
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            px: 3,
                                            py: 1,
                                            backgroundColor: "#2C6EF9",
                                            "&:hover": {
                                                backgroundColor: "#1e5dd9",
                                            },
                                        }}
                                    >
                                        Tweet
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Paper>

                    <Stack spacing={2}>
                        {tweets.map((tweet) => (
                            <Paper
                                key={tweet.id}
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 2,
                                    backgroundColor: "white",
                                }}
                            >
                                <Stack spacing={2}>
                                    {/* Tweet Header */}
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "#2C6EF9",
                                                width: 48,
                                                height: 48,
                                            }}
                                        >
                                            {tweet.author.name.charAt(0)}
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {tweet.author.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    @{tweet.author.username}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                    · {tweet.createdAt}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
                                                {tweet.content}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Tweet Actions */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            pl: 7,
                                            pt: 1,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => toggleCommentForm(tweet.id)}
                                            sx={{
                                                color: "text.secondary",
                                                "&:hover": { color: "#2C6EF9", backgroundColor: "rgba(44, 110, 249, 0.1)" },
                                            }}
                                        >
                                            <ChatBubbleOutlineIcon fontSize="small" />
                                        </IconButton>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <IconButton
                                                onClick={() => handleRetweet(tweet.id)}
                                                sx={{
                                                    color: tweet.isRetweeted ? "#10b981" : "text.secondary",
                                                    "&:hover": {
                                                        color: "#10b981",
                                                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                                                    },
                                                }}
                                            >
                                                <RepeatIcon fontSize="small" />
                                            </IconButton>
                                            {tweet.retweets > 0 && (
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    {tweet.retweets}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                            <IconButton
                                                onClick={() => handleLike(tweet.id)}
                                                sx={{
                                                    color: tweet.isLiked ? "#ef4444" : "text.secondary",
                                                    "&:hover": {
                                                        color: "#ef4444",
                                                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                                                    },
                                                }}
                                            >
                                                {tweet.isLiked ? (
                                                    <FavoriteIcon fontSize="small" />
                                                ) : (
                                                    <FavoriteBorderIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                            {tweet.likes > 0 && (
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    {tweet.likes}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Comment Form */}
                                    {commentForms[tweet.id] && <CommentForm tweetId={tweet.id} />}

                                    {/* Comments Section */}
                                    {tweet.comments.length > 0 && (
                                        <Box sx={{ pl: 7 }}>
                                            <Button
                                                onClick={() => toggleComments(tweet.id)}
                                                size="small"
                                                sx={{
                                                    textTransform: "none",
                                                    color: "text.secondary",
                                                    mb: 1,
                                                }}
                                            >
                                                {expandedComments[tweet.id] ? "Hide" : "Show"} {tweet.comments.length}{" "}
                                                {tweet.comments.length === 1 ? "comment" : "comments"}
                                            </Button>

                                            {expandedComments[tweet.id] && (
                                                <Stack spacing={2} sx={{ mt: 1 }}>
                                                    {tweet.comments.map((comment) => (
                                                        <Box key={comment.id}>
                                                            <Divider sx={{ mb: 2 }} />
                                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                                <Avatar
                                                                    sx={{
                                                                        bgcolor: "#2C6EF9",
                                                                        width: 36,
                                                                        height: 36,
                                                                    }}
                                                                >
                                                                    {comment.author.name.charAt(0)}
                                                                </Avatar>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                                            {comment.author.name}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                                            @{comment.author.username}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                                            · {comment.createdAt}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Typography variant="body2" sx={{ color: "text.primary", mb: 1 }}>
                                                                        {comment.content}
                                                                    </Typography>
                                                                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                            <IconButton
                                                                                onClick={() => handleRetweet(tweet.id, true, comment.id)}
                                                                                size="small"
                                                                                sx={{
                                                                                    color: comment.isRetweeted ? "#10b981" : "text.secondary",
                                                                                    "&:hover": {
                                                                                        color: "#10b981",
                                                                                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <RepeatIcon fontSize="small" />
                                                                            </IconButton>
                                                                            {comment.retweets > 0 && (
                                                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                                                    {comment.retweets}
                                                                                </Typography>
                                                                            )}
                                                                        </Box>
                                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                                            <IconButton
                                                                                onClick={() => handleLike(tweet.id, true, comment.id)}
                                                                                size="small"
                                                                                sx={{
                                                                                    color: comment.isLiked ? "#ef4444" : "text.secondary",
                                                                                    "&:hover": {
                                                                                        color: "#ef4444",
                                                                                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                                                                                    },
                                                                                }}
                                                                            >
                                                                                {comment.isLiked ? (
                                                                                    <FavoriteIcon fontSize="small" />
                                                                                ) : (
                                                                                    <FavoriteBorderIcon fontSize="small" />
                                                                                )}
                                                                            </IconButton>
                                                                            {comment.likes > 0 && (
                                                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                                                    {comment.likes}
                                                                                </Typography>
                                                                            )}
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            )}
                                        </Box>
                                    )}
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Home;