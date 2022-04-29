import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createCool, deleteCool } from "../../store/cool"
import { createFunny, deleteFunny } from "../../store/funny"
import { createUseful, deleteUseful } from "../../store/useful"
import './Useful.css'
const UsefulFunnyCool = ({review}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const user_id = useSelector((state) => state.session.user?.id)
    const useful = useSelector((state) => state.useful)
    const funny = useSelector((state) => state.funny)
    const cool = useSelector((state) => state.cool)

    const usefulArr = Object.values(useful)
    const funnyArr = Object.values(funny)
    const coolArr = Object.values(cool)

    const filterUsefulArr = usefulArr.filter((useful) => useful?.review_id === review?.id)
    const filterFunnyArr = funnyArr.filter((funny) => funny?.review_id === review?.id)
    const filterCoolArr = coolArr.filter((cool) => cool?.review_id === review?.id)

    const userHasUseful = usefulArr.filter((useful) => useful?.user_id === user_id)
    const userUsefulReview = userHasUseful.filter((useful) => useful?.review_id === review.id)

    const userHasFunny = funnyArr.filter((funny) => funny?.user_id === user_id)
    const userFunnyReview = userHasFunny.filter((funny) => funny?.review_id === review.id)

    const userHasCool = coolArr.filter((cool) => cool?.user_id === user_id)
    const userCoolReview = userHasCool.filter((cool) => cool?.review_id === review.id)


    let handleUseful;
    let handleFunny;
    let handleCool;
    let usefulClassName;
    let funnyClassName;
    let coolClassName;
    if (user_id) {
        if (!userUsefulReview.length) {
            usefulClassName = "reviewFormButton";
            handleUseful = (e) => {
                e.preventDefault();
                const payload = {
                    review_id: review?.id,
                    user_id
                }
                dispatch(createUseful(payload))
            };
        } else {
            usefulClassName = "buttonSelected"
            handleUseful = (e) => {
                e.preventDefault();
                dispatch(deleteUseful(userUsefulReview[0]?.id))
            }
        }
        if (!userFunnyReview.length) {
            funnyClassName = "reviewFormButton";
            handleFunny = (e) => {
                e.preventDefault();
                const payload = {
                    review_id: review?.id,
                    user_id
                }
                dispatch(createFunny(payload))
            };
        } else {
            funnyClassName = "buttonSelected"
            handleFunny = (e) => {
                e.preventDefault();
                dispatch(deleteFunny(userFunnyReview[0]?.id))
            }
        }
        if (!userCoolReview.length) {
            coolClassName = "reviewFormButton";
            handleCool = (e) => {
                e.preventDefault();
                const payload = {
                    review_id: review?.id,
                    user_id
                }
                dispatch(createCool(payload))
            };
        } else {
            coolClassName = "buttonSelected"
            handleCool = (e) => {
                e.preventDefault();
                dispatch(deleteCool(userCoolReview[0]?.id))
            }
        }

    } else {
        usefulClassName = "reviewFormButton";
        funnyClassName = "reviewFormButton";
        coolClassName = "reviewFormButton";
        handleUseful = (e) => {
            e.preventDefault()
         history.push(`/login`)
        }
        handleFunny = (e) => {
            e.preventDefault()
         history.push(`/login`)
        }
        handleCool = (e) => {
            e.preventDefault()
         history.push(`/login`)
        }
    }


    return (
        <>
        <div>
            <button onClick={handleUseful} className={usefulClassName}><i className="fa-solid fa-lightbulb" /> Useful {filterUsefulArr.length ? filterUsefulArr.length : <></>}</button>
            <button onClick={handleFunny} className={funnyClassName}><i className="fa-solid fa-face-laugh-beam" /> Funny {filterFunnyArr.length ? filterFunnyArr.length : <></>}</button>
            <button onClick={handleCool} className={coolClassName}><i className="fa-solid fa-beer-mug-empty" /> Cool {filterCoolArr.length ? filterCoolArr.length : <></>}</button>
        </div>
        </>
    )
}

export default UsefulFunnyCool
