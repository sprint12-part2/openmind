import { Children, cloneElement } from "react";
import clsx from "clsx";
import { Dropdown } from ".";
import { Icon } from "@components/Icon";
import styles from "./Select.module.css";

/**
 * Select 컴포넌트 (내부적으로 드롭다운을 이용합니다.)
 *
 * @param {Object} props
 * @param {string} value - 선택된 값
 * @param {function} onChange - 값이 변경될 때 호출되는 함수
 * @param {string} className - 추가적인 CSS 클래스명
 *
 * @returns {JSX.Element} Select 컴포넌트 외부 컨테이너
 *
 * @example
 * // Option컴포넌트와 함께 사용하세요
 * <Select value={seletValue} onChange={(value) => setSelectValue(value)}>
 *     <Select.Option value="name">이름순</Select.Option>
 * </Select>
 *
 */
export function Select({ value, onChange, className, children, ...props }) {
  const selectedLabel = Children.toArray(children).find((child) => child.props.value === value)
    ?.props.children;

  const selectClassName = clsx(styles.select, className);

  return (
    <Dropdown onChange={onChange} className={selectClassName} {...props}>
      <Dropdown.Trigger className={styles.trigger}>
        {({ isOpen }) => (
          <div className={clsx(styles.button, isOpen && styles.open)}>
            <span className={styles.label}>{selectedLabel}</span>
            {isOpen ? (
              <Icon name="arrowUp" color="black" size={14} />
            ) : (
              <Icon name="arrowDown" color="gray-400" size={14} />
            )}
          </div>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu className={styles.list}>
        {Children.map(children, (child) => cloneElement(child, { currentValue: value, onChange }))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

/**
 * Option 컴포넌트 (Select 컴포넌트 내부에서 사용해주세요)
 *
 * @param {Object} props
 * @param {string} value - 각 옵션의 고유 값
 * @param {string} className - 추가적인 CSS 클래스명
 *
 * @returns {JSX.Element} Options 컴포넌트
 */
function Option({ currentValue, value, onChange, className, children, ...props }) {
  function handleClick() {
    onChange(value);
  }

  const isActive = currentValue === value;
  const itemClassName = clsx(styles.item, isActive && styles.active, className);

  return (
    <Dropdown.Item className={itemClassName} onClick={handleClick} {...props}>
      {children}
    </Dropdown.Item>
  );
}

Select.Option = Option;
