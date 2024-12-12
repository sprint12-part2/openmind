import { useState } from "react";
import styles from "./ChankiSample.module.css";
import { Icon } from "@components/Icon";
import { Reaction } from "@components/Reaction";
import { Avatar } from "@components/Avatar/Avatar";
import { MoreMenu, Select } from "@components/Dropdown";

export default function ChankiSample() {
  const [formData, setFormData] = useState({
    sort: "",
    region: "seoul",
    content: "",
  });
  return (
    <div>
      <div className={styles.flex}>
        <MoreMenu>
          <MoreMenu.Item onClick={() => alert("hi")} icon="edit">
            수정하기
          </MoreMenu.Item>
          <MoreMenu.Item icon="close">삭제하기</MoreMenu.Item>
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
        <Icon name="arrowDown" />
        <Icon name="arrowDown" color="#fc0" />
        <Icon name="arrowDown" color="red" />
        <Icon name="arrowDown" size={40} color="var(--color-primary-300)" />
        <Icon name="arrowDown" color="primary" />
      </div>
      <div className={styles.flex}>
        <Icon name="arrowDown" />
        <Icon name="arrowUp" />
        <Icon name="arrowLeft" />
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
