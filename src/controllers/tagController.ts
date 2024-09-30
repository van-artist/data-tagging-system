import { Request, Response } from 'express';
import TagModel from '../models/tagModel';

// 获取所有标签
export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.find();
    res.json(tags);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
    } else {
      console.error('发生未知错误');
    }
    process.exit(1);
  }
};
export const getPairById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tag = await TagModel.findOne({ id: id });
    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }
    res.json(tag);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
    } else {
      console.error('发生未知错误');
    }
    process.exit(1);
  }
};

// 创建新标签
export const createTag = async (req: Request, res: Response) => {
  try {
    const { image_paths, description, id, batch } = req.body;
    // 检查是否已存在相同的标签
    const existingTag = await TagModel.findOne({ id, batch });

    // 如果已存在，则返回 409 状态码并提示数据已存在
    if (existingTag) {
      console.log('标签已存在，无法重复创建');
      res.status(409).json({ message: '标签已存在，无法重复创建' });
      return;
    }

    console.log('Received data:', { description, id, batch, image_paths });
    const newTag = new TagModel({ description, id, batch, image_paths });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
    } else {
      console.error('发生未知错误');
    }
    process.exit(1);
  }
};

//更新标签
export const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { image_paths, description, tagged_type, batch } = req.body;

    // 使用 findByIdAndUpdate 可以优化更新过程
    const tag = await TagModel.findOneAndUpdate(
      { id: id, batch: batch },
      { image_paths, description, tagged_type },
      { new: true } // 返回更新后的文档
    );
    console.log('Received data:', {
      description,
      id,
      batch,
      image_paths,
      tagged_type,
    });

    // 如果找不到相应标签，返回 404 错误
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    console.log('Updated tag:', tag);
    // 成功更新后返回更新的标签
    res.json(tag);
  } catch (error: unknown) {
    // 捕获并处理错误
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
      res.status(500).json({ message: `服务器内部错误: ${error.message}` });
    } else {
      console.error('发生未知错误');
      res.status(500).json({ message: '发生未知错误' });
    }
  }
};

//添加标记
export const addTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tagged_type, batch } = req.body;
    console.log('Received data:', { id, tagged_type, batch });
    const tag = await TagModel.findOne({ id, batch });
    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }
    tag.tagged_type = tagged_type;
    await tag.save();
    res.json(tag);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
    } else {
      console.error('发生未知错误');
    }
    process.exit(1);
  }
};
