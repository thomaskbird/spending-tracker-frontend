import * as React from "react";
import "./Draggable.scss";
// import styled, { css } from 'styled-components';

interface OnDragTranslate {
  translateX: number,
  translateY: number
};

interface DefaultProps {
  dragX: boolean;
  dragY: boolean;
}

const DEFAULT_PROPS: DefaultProps = {
  dragX: true,
  dragY: true
};

interface DragLimitRange {
  min: number;
  max: number;
}

interface DragLimits {
    x: DragLimitRange;
    y: DragLimitRange;
}

interface DraggableProps extends Partial<DefaultProps> {
  dragLimits?: DragLimits;
  onDragStart(): void;
  onDrag(translate: OnDragTranslate): void;
  onDragEnd(): void;
}

interface State {
  isDragging: boolean;

  originalX: number;
  originalY: number;

  translateX: number;
  translateY: number;

  lastTranslateX: number;
  lastTranslateY: number;
}

export class Draggable extends React.Component<DraggableProps, State> {
  /**
   * @inheritDoc
   */
  public static readonly defaultProps = DEFAULT_PROPS;

  constructor(props: DraggableProps, context: any) {
    super(props);

    this.state = {
      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: 0,
      translateY: 0,

      lastTranslateX: 0,
      lastTranslateY: 0
    };
  }

  public componentWillUnmount(): void {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseDown(clientX: number, clientY: number): void {
    window.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event.clientX, event.clientY);
    });
    window.addEventListener("mouseup", () => {
      this.handleMouseUp();
    });

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  private handleMouseMove(clientX: number, clientY: number): void {
    if (!this.state.isDragging) {
      return;
    }

    this.setState(prevState => {console.log(clientX, prevState.originalX, prevState.lastTranslateX);
      let x = (clientX - prevState.originalX + prevState.lastTranslateX);

      if(this.props.dragLimits && this.props.dragLimits.x.max >= x && this.props.dragLimits.x.min <= x) {

      } else {
        x = this.props.dragLimits!.x.min;
      }

      return {
        translateX: x,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }
    }, () => {
      if (this.props.onDrag) {
        this.props.onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
  };

  private handleMouseUp(): void {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      lastTranslateX: this.state.translateX,
      lastTranslateY: this.state.translateY,

      isDragging: false
    },
    () => {
      if (this.props.onDragEnd) {
        this.props.onDragEnd();
      }
    });
  };

  public render(): JSX.Element {
    let translateString = "";

    if(this.props.dragX && this.props.dragY) {
      translateString = `translate(${this.state.translateX}px, ${this.state.translateY}px)`;
    } else {
      if(this.props.dragX) {
        translateString = `translate(${this.state.translateX}px, 0px)`;
      }

      if(this.props.dragY) {
        translateString = `translate(0px, ${this.state.translateY}px)`;
      }
    }
    return (
      <div
        onMouseDown={(event) => {
          this.handleMouseDown(event.clientX, event.clientY);
        }}
        className={`Draggable ${this.state.isDragging ? "dragging": ""}`}
        style={{
          border: "1px solid red",
          transform: translateString
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
const Container = styled.div.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`
  }),
})`
  cursor: grab;
  
  ${({ isDragging }) =>
  isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;
*/