import { createContext, useContext, useEffect, useRef, useState } from "react";

const DropdownStateContext = createContext();
const DropdownDispatchContext = createContext();

function useDropdownState() {
  const context = useContext(DropdownStateContext);
  if (!context) {
    throw new Error("드롭다운 내부 컴포넌트는 드롭다운 컴포넌트 내부에서 사용해주세요");
  }
  return context;
}

function useDropdownDispatch() {
  const context = useContext(DropdownDispatchContext);
  if (!context) {
    throw new Error("드롭다운 내부 컴포넌트는 드롭다운 컴포넌트 내부에서 사용해주세요");
  }
  return context;
}

export function Dropdown({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const stateValue = {
    isOpen,
  };

  const dispatchValue = {
    setIsOpen,
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <DropdownStateContext.Provider value={stateValue}>
      <DropdownDispatchContext.Provider value={dispatchValue}>
        <div ref={dropdownRef} {...props}>
          {children}
        </div>
      </DropdownDispatchContext.Provider>
    </DropdownStateContext.Provider>
  );
}

function Trigger({ children, ...props }) {
  const { setIsOpen } = useDropdownDispatch();
  const { isOpen } = useDropdownState();

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {typeof children === "function" ? children({ isOpen }) : children}
    </button>
  );
}

function Menu({ children, ...props }) {
  const { isOpen } = useDropdownState();

  if (!isOpen) return null;

  return <ul {...props}>{children}</ul>;
}

function Item({ onClick, disabled, children, ...props }) {
  const { setIsOpen } = useDropdownDispatch();

  function handleClick() {
    if (disabled) return;

    setIsOpen(false);
    onClick && onClick();
  }

  return (
    <li>
      <button type="button" onClick={handleClick} disabled={disabled} {...props}>
        {children}
      </button>
    </li>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;
