import express from 'express';
import {
  getTags,
  createTag,
  updateTag,
  getTagById,
  addTag,
} from '../controllers/tagController';

const router = express.Router();
router.get('/', getTags); // 获取所有标签
router.get('/:id', getTagById); // 获取指定标签
router.post('/', createTag); // 创建新标签
router.put('/:id', updateTag); // 更新标签
router.put('/tag/:id', addTag); // 添加图片路径

export default router;
