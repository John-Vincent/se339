package imax.can;

import java.io.IOException;

import android.util.Log;

public class CanOperation {
	private String canName;
	private int bitrate;
	private int canSocket;

	public CanOperation(String canName, int bitrate) {
		super();
		this.canName = canName;
		this.bitrate = bitrate;
		System.loadLibrary("QYCan");
		Log.e("can", "load MyCantest ok");
		//下面操作失败要处理
		if(this.CanOperationUp())
			System.out.println("can up success");
		if(this.CanOperationOpen())
			System.out.println("can open success");
	}

	public boolean CanOperationOpen() {
		this.canSocket = openCan(this.canName);
		if (this.canSocket < 0)
			return false;
		else
			return true;
	}

	public void CanOperationClose() {
		closeCan(this.canSocket);
	}

	public boolean CanOperationUp() {
		java.lang.Process por;
		try {
			por = Runtime.getRuntime().exec("ip link set "+this.canName+" type can bitrate "+this.bitrate);
			por.waitFor();
			if (por.exitValue() != 0)
				return false;
			por = Runtime.getRuntime().exec("ip link set "+this.canName+" up");
			por.waitFor();
			if (por.exitValue() != 0)
				return false;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean CanOperationReup() {
		if(!this.CanOperationDown())
			return false;
		if(!this.CanOperationUp())
			return false;
		return true;
	}

	public boolean CanOperationDown() {
		java.lang.Process por;
		try {
			por = Runtime.getRuntime().exec("ip link set "+this.canName+" down");
			por.waitFor();
			if (por.exitValue() != 0)
				return false;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public int CanOperationWrite(CanNormalFrame buff) {
		return canWrite(this.canSocket, buff);
	}

	public int CanOperationRead(CanNormalFrame[] buff, int len) {
		return canRead(this.canSocket, buff, len);
	}

	private native int canRead(int canSocket, CanNormalFrame buff[], int len);

	private native int canWrite(int canSocket, CanNormalFrame buff);

	private native int openCan(String str);

	private native void closeCan(int canSocket);
}
