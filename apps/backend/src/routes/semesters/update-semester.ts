import createError from "http-errors";

import { Router } from "express";
import { Types } from "mongoose";

import validateObjectId from "../../middlewares/validate-object-id.middleware";

import { ClassDocument, ClassModel } from "../../models/class.model";
import { SemesterModel } from "../../models/semester.model";

import { handler } from "../../utils/handler";

import { validate } from "../../validators/update-semester.validator";

const route = Router();

route.patch(
  "/:id",
  validateObjectId("id"),
  handler(async (req) => {
    const { classes: classIds, name } = await validate(req.body);
    const { id } = req.params;

    const semester = await SemesterModel.findOne({
      _id: id,
      user: req.user.id
    });

    if (!semester) {
      throw new createError.BadRequest(`Semester '${id}' does not exist!`);
    }

    if (classIds) {
      const classes = await ClassModel.find({ _id: { $in: classIds } });
      const ids = classes.map((c: ClassDocument) => c._id);

      semester.classes = new Types.Array(...ids);
    }

    if (name && name !== semester.name) {
      semester.name = name;
    }

    await semester.save();

    return {
      updated: semester
    };
  })
);

export default route;
