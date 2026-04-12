function SignUpPage() {
    return (
        <div>
            <div>
        <h2>Sign up</h2>
        <form id="signup" ref={signupFormRef} onSubmit={handleSignup}>
          <label htmlFor="">Username</label>
          <input required name="username" type="text" disabled={isLogin} />
          <label htmlFor="">Email</label>
          <input required name="email" type="email" disabled={isLogin} />
          <label htmlFor="">Password</label>
          <input
            required
            minLength={8}
            name="password"
            type="password"
            disabled={isLogin}
          />
        </form>

        <div>
          <Button form="signup" type="submit" disabled={isLogin}>
            Sign up
          </Button>
          <p>
            Already have an account?{" "}
            <button
              type="button"
              disabled={isLogin}
              onClick={() => setIsLogin(!isLogin)}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
            
        </div>
    )
}

export default SignUpPage
