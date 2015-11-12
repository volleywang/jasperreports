/*
 * JasperReports - Free Java Reporting Library.
 * Copyright (C) 2001 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is part of JasperReports.
 *
 * JasperReports is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JasperReports is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with JasperReports. If not, see <http://www.gnu.org/licenses/>.
 */
package net.sf.jasperreports.engine.export.ooxml;

import net.sf.jasperreports.engine.JRAlignment;
import net.sf.jasperreports.engine.JRPrintElement;
import net.sf.jasperreports.engine.export.JRExporterGridCell;
import net.sf.jasperreports.engine.type.HorizontalAlignEnum;
import net.sf.jasperreports.engine.type.ModeEnum;
import net.sf.jasperreports.engine.type.VerticalAlignEnum;
import net.sf.jasperreports.engine.util.JRColorUtil;


/**
 * @author Teodor Danciu (teodord@users.sourceforge.net)
 * @version $Id$
 */
public class XlsxStyleInfo
{
	/**
	 *
	 */
	protected int formatIndex; 
	protected int fontIndex; 
	protected int borderIndex; 
	protected String backcolor; 
	protected String horizontalAlign;
	protected String verticalAlign;
	protected boolean isWrapText = true;
	protected boolean isHidden;
	protected boolean isLocked;
	protected int rotation;
	
	/**
	 *
	 */
	public XlsxStyleInfo(
		int formatIndex, 
		int fontIndex, 
		int borderIndex, 
		JRExporterGridCell gridCell, 
		boolean isWrapText,
		boolean isHidden,
		boolean isLocked,
		int rotation
		)
	{
		this.formatIndex = formatIndex;
		this.fontIndex = fontIndex;
		this.borderIndex = borderIndex;
		
		JRPrintElement element = gridCell.getElement();
		
		if (element != null && element.getModeValue() == ModeEnum.OPAQUE)
		{
			this.backcolor = JRColorUtil.getColorHexa(element.getBackcolor());
		}
		else if (gridCell.getBackcolor() != null)
		{
			this.backcolor = JRColorUtil.getColorHexa(gridCell.getBackcolor());
		}

		JRAlignment align = element instanceof JRAlignment ? (JRAlignment)element : null;
		if (align != null)
		{
			this.horizontalAlign = getHorizontalAlignment(align.getHorizontalAlignmentValue(), align.getVerticalAlignmentValue(), rotation);//FIXMEXLSX use common util
		    this.verticalAlign = getVerticalAlignment(align.getHorizontalAlignmentValue(), align.getVerticalAlignmentValue(), rotation);//FIXMEXLSX use common util			
			
		}
		
		this.isWrapText = isWrapText;
		this.isHidden = isHidden;
		this.isLocked = isLocked;
		this.rotation = rotation;
	}

	  protected String getHorizontalAlignment(HorizontalAlignEnum hAlign, VerticalAlignEnum vAlign, int rotation)
	  {
	    switch (rotation)
	    {
	      case 90:
	        switch (vAlign)
	        {
	          case BOTTOM : return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.RIGHT);
	          case MIDDLE : return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.CENTER);
	          default: return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.LEFT);
	        }
	      case 180:
	        switch (vAlign)
	        {
	          case BOTTOM : return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.LEFT);
	          case MIDDLE : return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.CENTER);
	          default: return XlsxParagraphHelper.getHorizontalAlignment(HorizontalAlignEnum.RIGHT);
	        }
	      default: return XlsxParagraphHelper.getHorizontalAlignment(hAlign);  
	    }
	  }
	  
	  protected String getVerticalAlignment(HorizontalAlignEnum hAlign, VerticalAlignEnum vAlign, int rotation)
	  {
	    switch (rotation)
	    {
	      case 90:
	        switch (hAlign)
	        {
	          case RIGHT : return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.TOP);
	          case CENTER : return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.MIDDLE);
	          default: return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.BOTTOM);
	        }
	      case 180:
	        switch (hAlign)
	        {
	          case RIGHT : return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.BOTTOM);
	          case CENTER : return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.MIDDLE);
	          default: return DocxCellHelper.getVerticalAlignment(VerticalAlignEnum.TOP);
	        }
	      default: return DocxCellHelper.getVerticalAlignment(vAlign);  
	    }
	  }	
	
	public String getId()
	{
		return 
		formatIndex + "|" + fontIndex + "|" + borderIndex + "|" + backcolor + "|" + horizontalAlign + "|" + verticalAlign 
		+ "|" + isWrapText + "|" + isHidden + "|" + isLocked + "|" + rotation;
	}
}
