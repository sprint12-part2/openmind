import { useState } from "react";
import styles from "./ChankiSample.module.css";
import { MoreMenu, Select, Avatar, Reaction, Icon } from "@components/ui";
import { FeedCard } from "@components/FeedCard";

const fakeQuestion1 = {
  id: 15382,
  subjectId: 9281,
  content: "히히히호호호",
  like: 2,
  dislike: 2,
  createdAt: "2024-12-12T14:00:03.343827Z",
  answer: {
    id: 6976,
    questionId: 15382,
    content: "웃기냐고",
    isRejected: false,
    createdAt: "2024-12-12T14:00:17.802338Z",
  },
};

const fakeQuestion2 = {
  id: 15382,
  subjectId: 9281,
  content: "히히히호호호",
  like: 2,
  dislike: 2,
  createdAt: "2024-12-12T14:00:03.343827Z",
};

const fakeUser = {
  id: 9281,
  name: "test",
  imageSource:
    "https://fastly.picsum.photos/id/502/200/200.jpg?hmac=c6mcZ5mcmjadIeDKaJClpvPz9R9-X9q6c0Un-n73Kv4",
  questionCount: 14,
  createdAt: "2024-12-09T12:56:20.283029Z",
};

export default function ChankiSample() {
  const [formData, setFormData] = useState({
    sort: "",
    region: "seoul",
    content: "",
  });

  return (
    <div>
      <div className={styles.feedCards}>
        <FeedCard
          question={fakeQuestion1}
          feedOwner={fakeUser}
          mode="view"
          onUpdate={() => alert("답변을 수정한다!!!")}
          onCreate={() => alert("답변을 작성한다!!!")}
          onDelete={() => alert("답변을 지운다!!!")}
          onReject={() => alert("거절한닷!!!")}
          onLike={() => alert("좋아욧!!!")}
          onDislike={() => alert("싫어욧!!!")}
        />
        <FeedCard
          question={fakeQuestion2}
          feedOwner={fakeUser}
          mode="view"
          onUpdate={() => alert("답변을 수정한다!!!")}
          onCreate={() => alert("답변을 작성한다!!!")}
          onDelete={() => alert("답변을 지운다!!!")}
          onReject={() => alert("거절한닷!!!")}
          onLike={() => alert("좋아욧!!!")}
          onDislike={() => alert("싫어욧!!!")}
        />
      </div>
      <div className={styles.feedCards}>
        <FeedCard
          question={fakeQuestion1}
          feedOwner={fakeUser}
          mode="answer"
          onUpdate={() => alert("답변을 수정한다!!!")}
          onCreate={() => alert("답변을 작성한다!!!")}
          onDelete={() => alert("답변을 지운다!!!")}
          onReject={() => alert("거절한닷!!!")}
          onLike={() => alert("좋아욧!!!")}
          onDislike={() => alert("싫어욧!!!")}
        />
        <FeedCard
          question={fakeQuestion2}
          feedOwner={fakeUser}
          mode="answer"
          onUpdate={() => alert("답변을 수정한다!!!")}
          onCreate={() => alert("답변을 작성한다!!!")}
          onDelete={() => alert("답변을 지운다!!!")}
          onReject={() => alert("거절한닷!!!")}
          onLike={() => alert("좋아욧!!!")}
          onDislike={() => alert("싫어욧!!!")}
        />
      </div>
      <div className={styles.flex}>
        <MoreMenu>
          <MoreMenu.Item onClick={() => alert("hi")} icon="edit">
            수정하기
          </MoreMenu.Item>
          <MoreMenu.Item icon="close" disabled>
            삭제하기
          </MoreMenu.Item>
        </MoreMenu>

        {/* 기본 사용형태 (최소 너비로 셋팅이 됩니다.) */}
        <Select
          value={formData.sort}
          onChange={(value) => setFormData((prev) => ({ ...prev, sort: value }))}
        >
          <Select.Option value="">선택</Select.Option>
          <Select.Option value="name">이름순</Select.Option>
          <Select.Option value="date">최신순</Select.Option>
          <Select.Option value="" disabled>
            불가능
          </Select.Option>
        </Select>

        {/* 컨테이너의 너비로 조절도 가능 */}
        <div style={{ width: "120px" }}>
          <Select
            value={formData.region}
            onChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
          >
            <Select.Option value="seoul">서울</Select.Option>
            <Select.Option value="busan">부산</Select.Option>
            <Select.Option value="korea">여기는 대한민국???</Select.Option>
          </Select>
        </div>

        {/* 직접 너비를 받아도 되요 */}
        <Select
          value={formData.content}
          onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
          style={{ width: "240px" }}
        >
          <Select.Option value="">선택</Select.Option>
          <Select.Option value="content-1">모던자바스크립트 딥다이브</Select.Option>
          <Select.Option value="content-2">짧은글과 긴글혼합</Select.Option>
          <Select.Option value="content-3">으어어어어어어</Select.Option>
        </Select>
      </div>
      <div className={styles.flex}>
        <Avatar
          src="https://fastly.picsum.photos/id/502/200/200.jpg?hmac=c6mcZ5mcmjadIeDKaJClpvPz9R9-X9q6c0Un-n73Kv4"
          name="방 사진"
          size={120}
        />
        <div style={{ width: "80px" }}>
          <Avatar src="error" />
        </div>
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} />
        <Reaction type="dislike" count={0} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={16} />
        <Reaction type="dislike" count={0} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} />
        <Reaction type="dislike" count={6} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} disabled />
        <Reaction type="dislike" count={6} disabled />
      </div>
      <div className={styles.flex}>
        <Icon name="elbowDown" />
        <Icon name="elbowDown" color="#fc0" />
        <Icon name="elbowDown" color="red" />
        <Icon name="elbowDown" size={40} color="var(--color-primary-300)" />
        <Icon name="elbowDown" color="primary" />
      </div>
      <div className={styles.flex}>
        <Icon name="elbowDown" />
        <Icon name="elbowUp" />
        <Icon name="elbowLeft" />
        <Icon name="elbowRight" />
        <Icon name="arrowRight" />
        <Icon name="close" />
        <Icon name="edit" />
        <Icon name="facebook" />
        <Icon name="kakao" />
        <Icon name="link" />
        <Icon name="message" />
        <Icon name="more" />
        <Icon name="person" />
        <Icon name="reject" />
        <Icon name="thumbsUp" />
        <Icon name="thumbsDown" />
      </div>
    </div>
  );
}
