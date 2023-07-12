import UserModel from "../models/User";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

export default passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log(jwt_payload);
        // UserModel.findOne({id:jwt_payload.sub},(err,user)=>{
        //     if(err){
        //         return done(err,false)
        //     }
        //     if(user){
        //         return done(null,user)
        //     }else{
        //         return done(null,false)
        //     }
        // })
    
    }))
}