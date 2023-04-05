import React, { useEffect, useId, useRef } from 'react';
import { Input, Modal } from 'antd';
import {
    Button,
    Form,
    Rate,
    Row,
    Select,
} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserReviews } from '../../store/boardgames';
import { createReviews } from '../../store/boardgames';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const Review = ({ isReviewOpen, setIsReviewOpen, userId, gameHistory }) => {
    const dispatch = useDispatch()
    const [reviewInfo, setReviewInfo] = useState()
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current?.setFieldsValue({
            comment: "",
            rating: ""

        })
        dispatch(getUserReviews({ 'userId': userId })).then((res) => {
            for (const review of res.payload.reviews) {
                if (review.gameId === gameHistory[0].gameId) {
                    setReviewInfo(review)
                    inputRef.current?.setFieldsValue({
                        comment: `${review.comment}`,
                        rating: `${review.rating}`

                    })
                    break
                }
            }
        }).catch((err) => { console.log(err) })
    }, [userId, gameHistory])
    const onFinish = (values) => {
        const data = {
            ...values,
            'userId': userId,
            'gameId': gameHistory[0].gameId,
            'name': gameHistory[0].name
        }
        dispatch(createReviews(data)).then((res) => {
            setReviewInfo()
            setIsReviewOpen(false)
        }).catch((err) => {
            console.log(err)
        });
    };
    return (
        <div>
            <Modal title="리뷰작성" open={isReviewOpen} onCancel={() => { setIsReviewOpen(false) }}>

                {gameHistory && useId && <>
                    <Form
                        ref={inputRef}
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="comment"
                            label="댓글"
                            rules={[
                                {
                                    required: true,
                                    message: '댓글을 입력하십시오',
                                },
                            ]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>

                        <Form.Item name="rating" label="평점">
                            <Rate count={10} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>}
            </Modal>


        </div>
    );
};

export default Review;
