import { Modal } from "antd";
import { QuestionMarkCircle } from "iconoir-react";

export const showAlertDialog = ({
  title = "Are you sure about this?",
  onCancel,
  onConfirm,
  item,
  extra,
}) => {
  const leave = () => {
    console.log("cancelled");
  };
  //SAYS THAT DOCUMENT IS NOT DEFINED
  Modal.confirm({
    title: title,
    // (
    //   <div style={{display:"flex", gap:"1rem",alignItems:"center"}}>
    //     <QuestionMarkCircle style={{color:"orangered"}}/>
    //     <p>{title}</p>
    //   </div>
    // ),

    icon:<></>,
    onOk() {
      onConfirm(item,extra);
    },
    onCancel() {
      onCancel ? onCancel() : leave();
    },
    okText: "Yes, do it",
    cancelText: "No, abort it",
  });
};
