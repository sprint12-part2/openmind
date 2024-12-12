import clsx from "clsx";
import { Icon } from "@components/Icon";
import { Dropdown } from "./Dropdown";
import styles from "./MoreMenu.module.css";

/**
 * MoreMenu 컴포넌트 (내부적으로 드롭다운을 이용합니다.)
 *
 * @param {Object} props
 *
 * @returns {JSX.Element} MoreMenu 컴포넌트 외부 컨테이너
 *
 * @example
 * // Item 컴포넌트와 함께 사용하세요
 *   <MoreMenu>
 *     <MoreMenu.Item onClick={() => alert("hi")} icon="edit">
 *         수정하기
 *     </MoreMenu.Item>
 *     <MoreMenu.Item icon="close">삭제하기</MoreMenu.Item>
 *   </MoreMenu>
 *
 */
export function MoreMenu({ children, ...props }) {
  return (
    <Dropdown className={styles.more}>
      <Dropdown.Trigger className={styles.trigger} {...props}>
        <Icon name="more" color="black" />
      </Dropdown.Trigger>
      <Dropdown.Menu className={styles.list}>{children}</Dropdown.Menu>
    </Dropdown>
  );
}

function Item({ icon, className, children, ...props }) {
  const itemClassName = clsx(styles.item, className);

  return (
    <Dropdown.Item className={itemClassName} {...props}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </Dropdown.Item>
  );
}

MoreMenu.Item = Item;
