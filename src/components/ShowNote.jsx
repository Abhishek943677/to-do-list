import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import EditButton from "./EditButton";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Tooltip } from "@mui/material";

export default function ShowNote({
  items,
  removeItem,
  setFormData,
  setEditorContent,
  setIsEdit,
  setShowEditor,
}) {
  return (
    <div className=" space-y-2">
      {items !== undefined &&
        items.length !== 0 &&
        items.map((item, index) => {
          return (
            <div
              key={index}
              className="flex bg-slate-400 rounded-xl px-4  my-auto justify-between max-h-52 overflow-y-auto "
            >
              <p className="my-auto cursor-pointer space-x-2 flex flex-row">
                <p
                  className="hover:bg-gray-300 transition duration-300 p-[0.3rem] rounded-full"
                  onClick={() => removeItem(index)}
                >
                  <CheckCircleOutlineOutlinedIcon />
                </p>
                <p className="my-auto">
                  <Tooltip title={new Date(item.time).toLocaleString()}>
                    <CalendarMonthRoundedIcon />
                  </Tooltip>
                </p>
              </p>
              <div className="mt-2 px-3 pb-1" id="noteContent">
                <div dangerouslySetInnerHTML={{ __html: item.noteContent }} />
              </div>
              {/* <p className="my-auto cursor-pointer"> */}
              <p
                className="my-auto cursor-pointer inline-block p-2 rounded-full  hover:bg-gray-300 transition duration-300"
                onClick={() => {
                  setFormData(item);
                  setEditorContent(item.noteContent);
                  setIsEdit(true);
                  setShowEditor(true);
                  window.scroll(0, 0);
                }}
              >
                <BorderColorRoundedIcon />
              </p>
            </div>
          );
        })}
    </div>
  );
}
