import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PostsPage from "./components/PostsPage";
import PostDetail from "./components/PostsPage/PostDetail";
import MyCommentsPage from "./components/MyCommentsPage";
import MyPostsPage from "./components/MyPostsPage";
import MyLikesPage from "./components/MyLikesPage";
import NotFound from "./components/Errors/NotFound";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import EntryPage from './components/EntryPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  const user = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/posts/:postId'>
            <PostDetail isLoaded={isLoaded} />
          </Route>
          <Route path='/posts'>
            <PostsPage isLoaded={isLoaded} />
          </Route>
          <Route exact path="/">
            <EntryPage />
          </Route>
          <Route path={`/users/${user?.id}/comments`}>
            <MyCommentsPage isLoaded={isLoaded} />
          </Route>
          <Route exact path={`/users/${user?.id}/posts`}>
            <MyPostsPage isLoaded={isLoaded} />
          </Route>
          <Route exact path={`/users/${user?.id}/likes`}>
            <MyLikesPage isLoaded={isLoaded} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
