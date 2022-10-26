const About = () => {
    return (
        <div className="row col-lg-9">
            <div className="col-lg-8 profile-picture">
                <img src={'/assets/images/me.jpg'} />
            </div>
            <div className="col-lg-4">
                <div className="user-info">
                    <h2>About me</h2>
                    <h3>This is my first project after learning Node.js and React.js.</h3>
                    <h3>I wanted to create a web application with the knowledge that i have so far and i wanted to be
                        for something that i am passionate about. This is why i decided to create something regarding fishing.
                        Here you can share with us your fishing experience ,fishes that you cought and how.</h3>

                    <h3>You can meet new people and possibly find new fishing buddy. </h3>


                </div>
            </div>
        </div>
    )
}

export default About;